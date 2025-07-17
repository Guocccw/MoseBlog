import { defineConfig } from "vitepress";
import sidebar from "./sidebar.json";
// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: "/MoseBlog/",
	title: "MoseBlog",
	description: "A VitePress Site",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [{ text: "日记", link: "/daily/" }],
		sidebar: {
			"/daily/": sidebar,
		},
	},
});
