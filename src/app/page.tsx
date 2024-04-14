"use client";
import FilmList from "@/components/FilmCards/FilmList";
import NavBar from "@/components/navbar/NavBar";
import styles from "@/styles/WebLayout/page.module.css";
export default function Home() {
	return (
		<div className={styles.pageContainer}>
			<NavBar />
			<FilmList />
		</div>
	);
}
