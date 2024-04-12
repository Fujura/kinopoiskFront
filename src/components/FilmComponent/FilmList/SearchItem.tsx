import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/pageLayouts/FilmLayout/SearchItem.module.css";
import { useRouter } from "next/router";

const API_KEY = process.env.NEXT_PUBLIC_FILM_API_KEY;

const SearchItem = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const router = useRouter();

	const searchFilmHandler = async (e: any) => {
		e.preventDefault();
		if (!searchTerm) {
			return;
		} else {
			try {
				const response = await axios.get(
					`http://www.omdbapi.com/?apikey=${API_KEY}&t=${searchTerm}&type=movie`
				);
				console.log(response);
				if (response.data.Response !== "False") {
					router.push(`filmItem/${response.data.imdbID}`);
					setSearchTerm("");
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<form onSubmit={searchFilmHandler} className={styles.formContainer}>
			<label htmlFor="search" className={styles.searchLabel}>
				Поиск по названию
			</label>

			<input
				id="search"
				className={styles.searchInput}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setSearchTerm(e.target.value)
				}
				onKeyDown={(e) => {
					if (e.keyCode === 13) {
						searchFilmHandler(e);
					}
				}}
			/>
		</form>

		// <FilmItem />
	);
};

export default SearchItem;
