module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return cfg;
  },
  images: {
    loader: "imgix",
    path: "/",
  },
};
