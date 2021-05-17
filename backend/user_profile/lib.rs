use easy_hasher::easy_hasher::raw_keccak256;
use ic_cdk::export::{
    candid::{CandidType, Deserialize},
    Principal,
};
use ic_cdk::println;
use ic_cdk::*;
use ic_cdk_macros::*;
use secp256k1::recover;
use std::{collections::BTreeMap, convert::TryInto};

type ProfileStore = BTreeMap<Principal, Profile>;

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Profile {
    pub address: String,
    pub name: String,
    pub description: String,
}

impl Default for Profile {
    fn default() -> Self {
        Profile {
            address: String::from(""),
            name: String::from(""),
            description: String::from(""),
        }
    }
}

#[query(name = "getByPrincipal")]
fn get_by_principal(principal: Principal) -> Option<&'static Profile> {
    let profile_store = storage::get::<ProfileStore>();

    for (p, profile) in profile_store.iter() {
        if p.eq(&principal) {
            return Some(profile);
        }
    }

    None
}

#[query(name = "getByName")]
fn get_by_name(name: String) -> Option<&'static Profile> {
    let profile_store = storage::get::<ProfileStore>();

    for (_, profile) in profile_store.iter() {
        if profile.name.eq(&name) {
            return Some(profile);
        }
    }

    None
}

#[query(name = "getOwnProfile")]
fn get_own_profile() -> Profile {
    let principal_id = ic_cdk::caller();
    let profile_store = storage::get::<ProfileStore>();

    profile_store
        .get(&principal_id)
        .cloned()
        .unwrap_or_else(|| Profile::default())
}

#[query(name = "getOwnPrincipalId")]
fn get_own_principal_id() -> Principal {
    ic_cdk::caller()
}

#[query]
fn search(text: String) -> Option<&'static Profile> {
    let text = text.to_lowercase();
    let profile_store = storage::get::<ProfileStore>();

    for (_, p) in profile_store.iter() {
        if p.name.to_lowercase().contains(&text) || p.description.to_lowercase().contains(&text) {
            return Some(p);
        }
    }

    None
}

#[query]
fn list() -> Vec<&'static Profile> {
    let profile_store = storage::get::<ProfileStore>();

    let mut profiles: Vec<&'static Profile> = Vec::new();

    for (_, p) in profile_store.iter() {
        profiles.push(p);
    }

    return profiles;
}

fn _save_profile(profile: Profile) -> () {
    let principal_id = ic_cdk::caller();

    let profile_store = storage::get_mut::<ProfileStore>();

    profile_store.insert(principal_id, profile.clone());
}

#[update(name = "setName")]
fn set_name(handle: String) -> Profile {
    let mut profile = get_own_profile();
    profile.name = handle;
    _save_profile(profile.clone());
    return profile;
}

#[update(name = "setDescription")]
fn set_description(description: String) -> Profile {
    let mut profile = get_own_profile();
    profile.description = description;
    _save_profile(profile.clone());
    return profile;
}

#[update(name = "linkAddress")]
fn link_address(message: String, signature: String) -> Profile {
    let mut signature_bytes = hex::decode(signature.trim_start_matches("0x")).unwrap();
    let recovery_byte = signature_bytes.pop().expect("No recovery byte");
    let recovery_id = secp256k1::RecoveryId::parse_rpc(recovery_byte).unwrap();
    let signature_slice = signature_bytes.as_slice();
    let signature_bytes: [u8; 64] = signature_slice.try_into().unwrap();
    let signature = secp256k1::Signature::parse(&signature_bytes);
    let message_bytes = hex::decode(message.trim_start_matches("0x")).unwrap();
    let message_bytes: [u8; 32] = message_bytes.try_into().unwrap();
    let message = secp256k1::Message::parse(&message_bytes);
    let key = recover(&message, &signature, &recovery_id).unwrap();
    let key_bytes = key.serialize();
    let keccak256 = raw_keccak256(key_bytes[1..].to_vec());
    let keccak256_hex = keccak256.to_hex_string();
    let mut address: String = "0x".to_owned();
    address.push_str(&keccak256_hex[24..]);

    println!("Linked eth address {:?}", address);

    let mut profile = get_own_profile();
    profile.address = address.clone();
    _save_profile(profile.clone());

    return profile;
}

#[pre_upgrade]
fn pre_upgrade() {
    let profile_store = storage::get::<ProfileStore>();

    let mut profiles: Vec<(&Principal, &Profile)> = Vec::new();

    for (principal, profile) in profile_store.iter() {
        profiles.push((principal, profile));
        println!("Saving {:?}", profile.name);
    }
    storage::stable_save((profiles,)).unwrap();
}

#[post_upgrade]
fn post_upgrade() {
    let profile_store = storage::get_mut::<ProfileStore>();

    let res:Result<(Vec<(Principal, Profile)>,), String> = storage::stable_restore();
    match res {
        Ok((old_profiles,)) => {
            for profile in old_profiles {
                profile_store.insert(profile.0, profile.1.clone());
            }
            return;
        }
        Err(_) => return
    }
}