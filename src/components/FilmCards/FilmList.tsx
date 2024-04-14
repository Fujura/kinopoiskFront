import axios from "axios";
import React, { useEffect, useState } from "react";
import FilmItem from "./FilmItem/FilmItem";
const API_LINK = process.env.NEXT_PUBLIC_API_LINK;
import styles from "@/styles/pageLayouts/FilmLayout/Comments/FilmList/FIlmList.module.css";
const FilmList = () => {
	const [filmsData, setFilmsData] = useState<any>();
	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					`${API_LINK}/api/films?populate=deep,3`
				);
				setFilmsData(response.data);
			} catch (error) {}
		})();
	}, []);
	return (
		<div className={styles.filmsContainer}>
			{filmsData?.data?.map((film: any) => (
				<FilmItem key={film.id} filmData={film} />
			))}
		</div>
	);
};

export default FilmList;
