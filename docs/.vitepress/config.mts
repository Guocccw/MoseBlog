import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: "/MoseBlog/",
	title: "MoseBlog",
	description: "A VitePress Site",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [{ text: "Home", link: "/" }],

		sidebar: [
			{
				text: "Examples",
				items: [{ text: "Markdown Examples", link: "/markdown-examples" }],
			},
			{
				text: "daily",
				items: [
					{
						text: "2025-07",
						items: [
							{ text: "2025-07-10", link: "/daily/2025-07/2025-07-10" },
							{ text: "2025-07-11", link: "/daily/2025-07/2025-07-11" },
						],
					},
				],
			},
		],

		socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
	},
});
