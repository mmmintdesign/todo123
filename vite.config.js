import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/todo123/', // add this property and the value is the name of your repository
	test: {
		globals: true,
		environment: "jsdom",
	},
});
