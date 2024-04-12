import React, { useState } from "react";
import styles from "@/styles/pageLayouts/FilmLayout/Header.module.css";
import Image from "next/image";
import { LazyLoader } from "@/components/Loaders/LazyLoader";
import zIndex from "@mui/material/styles/zIndex";
const FilmHeader = () => {
	return (
		<div className={styles.container}>
			<Image
				src="/splashImage.png"
				alt="Splash Image"
				layout="fill"
				className={styles.bgImage}
				style={{ zIndex: -1, filter: "blur(10px)" }}
				quality={75}
			/>
			<h2 className={styles.title}>
				До сих пор не можешь определиться с{" "}
				<span className={styles.titleHighlight}>фильмом</span> на вечер? Мы тебе
				в этом поможем!
			</h2>
		</div>
	);
};

export default FilmHeader;
