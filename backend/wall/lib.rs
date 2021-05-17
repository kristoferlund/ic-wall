use ic_cdk::export::{
    candid::{CandidType, Deserialize},
    Principal,
};
use ic_cdk::*;
use ic_cdk_macros::*;

type Wall = Vec<Post>;

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Post {
    pub user: Principal,
    pub text: String,
}

#[query]
fn get() -> &'static Vec<Post> {
    storage::get::<Wall>()
}

#[update]
fn write(text: String) -> &'static Vec<Post> {
    let principal_id = ic_cdk::caller();

    let post = Post {
        user: principal_id,
        text,
    };

    let wall = storage::get_mut::<Wall>();
    wall.push(post);

    get()
}

#[pre_upgrade]
fn pre_upgrade() {
    let wall = get();
    storage::stable_save((wall,)).unwrap();
    return;
}

#[post_upgrade]
fn post_upgrade() {
    let wall = storage::get_mut::<Wall>();

    let res:Result<(Vec<Post>,), String> = storage::stable_restore();
    match res {
        Ok((old_posts,)) => {
            for post in old_posts {
                wall.push(post);
            }
            return;
        }
        Err(_) => return
    }
}