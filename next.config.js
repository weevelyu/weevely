const path = require("path")
const mode = process.env.NODE_ENV === "production"

module.exports = {
	basePath: "",
	distDir: ".next",
	compress: true,
	generateEtags: true,
	trailingSlash: false,
	poweredByHeader: true,
	pageExtensions: ["js", "jsx"],
	sassOptions: {
		includePaths: [path.join(__dirname, "./src/styles")],
	},
	eslint: {
		ignoreDuringBuilds: false,
	},
	assetPrefix: mode ? "http://cdn.localhost" : "",
	images: {
		domains: [
			"storage.googleapis.com",
			"lh1.googleusercontent.com",
			"lh2.googleusercontent.com",
			"lh3.googleusercontent.com",
			"lh4.googleusercontent.com",
			"lh5.googleusercontent.com",
			"lh6.googleusercontent.com",
			"d3djy7pad2souj.cloudfront.net",
		],
	},
}
