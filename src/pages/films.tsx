import React from "react";
import styles from "@/styles/pageLayouts/FilmLayout/Film.module.css";
import FilmHeader from "@/components/FilmComponent/FilmHeader/FilmHeader";

import { Inter } from "next/font/google";
import NavBar from "@/components/navbar/NavBar";
import SearchItem from "@/components/FilmComponent/FilmList/SearchItem";
const inter = Inter({ subsets: ["latin"] });

const films = () => {
	return (
		<div className={inter.className} style={{ margin: 0, padding: 0 }}>
			<style>
				{
					"body { background-color: #000; color: #fff; max-width: 1280px; margin: 0 auto; padding: 0; }"
				}
			</style>
			<NavBar />
			<main className={`${styles.mainContainer}`}>
				<FilmHeader />
				<div className={styles.searchItemContainer}>
					<SearchItem />
				</div>
			</main>
		</div>
	);
};

export default films;
