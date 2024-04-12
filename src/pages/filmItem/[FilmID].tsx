import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { Props } from "next/script";
import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/pageLayouts/FilmLayout/filmItem.module.css";
import { Inter } from "next/font/google";
import { LazyLoader } from "@/components/Loaders/LazyLoader";
import NavBar from "@/components/navbar/NavBar";
import Comments from "@/components/FilmComponent/FilmComments/Comments";
import store from "@/store/store";
import { Provider } from "react-redux";
const inter = Inter({ subsets: ["latin"] });

const API_KEY = process.env.NEXT_PUBLIC_FILM_API_KEY;

const FilmItem: NextPage<any> = ({ data }) => {
	const [loaderDisplay, setLoaderDisplay] = useState<"block" | "none">("block");
	const imageUrl = data.Poster;
	return (
		<Provider store={store}>
			<div className={inter.className} style={{ margin: 0, padding: 0 }}>
				<NavBar />
				<style>
					{
						"body { background-color: #000; color: #fff; max-width: 1280px; margin: 0 auto; padding: 0; }"
					}
				</style>
				<div className={styles.container}>
					{imageUrl !== "N/A" ? (
						<div>
							<div
								style={{
									position: "absolute",
									margin: "200px 0 0 220px",
									display: `${loaderDisplay}`,
								}}
							>
								<LazyLoader />
							</div>
							<Image
								src={imageUrl}
								width={500}
								height={500}
								alt="smtg"
								quality={100}
								onLoad={() => setLoaderDisplay("none")}
							/>
						</div>
					) : (
						<div>
							<Image
								src={"/notAvailable.jpg"}
								width={400}
								height={400}
								alt="smtg"
							/>
						</div>
					)}
					<div>
						<h2>{data.Title}</h2>
						<p>Year: {data.Year}</p>
						<p>Genre: {data.Genre}</p>
						<p>Run time: {data.Runtime}</p>
						<p>Language: {data.Language}</p>
						<p>Plot: {data.Plot}</p>
					</div>
				</div>
				<Comments data={data} />
			</div>
		</Provider>
	);
};

export default FilmItem;

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
	const ID = ctx.params?.FilmID;
	console.log(ID);

	if (!ID) {
		return { notFound: true };
	}

	try {
		const { data } = await axios.get(
			`http://www.omdbapi.com/?apikey=${API_KEY}&i=${ID}`
		);
		console.log(data);

		return {
			props: {
				data: data,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			notFound: true,
		};
	}
};
