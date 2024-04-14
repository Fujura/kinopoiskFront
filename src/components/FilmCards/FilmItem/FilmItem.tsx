import React, { FC } from "react";
import styles from "@/styles/pageLayouts/FilmLayout/Comments/FilmList/FilmItem.module.css";
import Image from "next/image";
import Link from "next/link";
import zIndex from "@mui/material/styles/zIndex";

const usePointerGlow = () => {
	const [status, setStatus] = React.useState(null);

	React.useEffect(() => {
		const syncPointer = ({ x: pointerX, y: pointerY }) => {
			const x = pointerX.toFixed(2);
			const y = pointerY.toFixed(2);
			const xp = (pointerX / window.innerWidth).toFixed(2);
			const yp = (pointerY / window.innerHeight).toFixed(2);
			document.documentElement.style.setProperty("--x", x);
			document.documentElement.style.setProperty("--xp", xp);
			document.documentElement.style.setProperty("--y", y);
			document.documentElement.style.setProperty("--yp", yp);
			setStatus({ x, y, xp, yp });
		};

		document.body.addEventListener("pointermove", syncPointer);
		return () => {
			document.body.removeEventListener("pointermove", syncPointer);
		};
	}, []);

	return [status];
};

const FilmItem: FC<any> = React.memo(({ filmData }) => {
	console.log(filmData);
	const [status] = usePointerGlow();
	const film = filmData.attributes;

	return (
		<article className={`${styles.itemContainer} ${styles.glow}`} data-glow>
			{film.imageUrl != null && film.imageUrl != "N/A" ? (
				<Image
					src={film.imageUrl}
					layout="fill"
					alt={film.filmTitle}
					style={{ zIndex: -1, filter: "blur(10px)" }}
					quality={1}
				/>
			) : (
				<Image
					src={"/notAvailable.jpg"}
					layout="fill"
					alt={film.filmTitle}
					style={{ zIndex: -1 }}
					quality={1}
				/>
			)}

			<div
				className={
					styles.textContainer + film.imageUrl != null && film.imageUrl != "N/A"
						? ` ${styles.whiteColor}`
						: ` ${styles.blackColor}`
				}
			>
				<h4 style={{ marginBottom: "10px" }}>{film.filmTitle}</h4>
				<p>RunTime: {film.runTime}</p>
				<p>Year: {film.year}</p>
			</div>

			<div className={styles.ratingContainer}>
				<p
					style={
						film.imageUrl != null && film.imageUrl != "N/A"
							? { color: "#fff" }
							: { color: "#000" }
					}
				>
					{film.rating}
				</p>
				<Image
					src={"/star.png"}
					width={16}
					height={16}
					alt="film rating. Star"
				/>
			</div>
			<span className={`${styles.span} ${styles.glow}`} data-glow></span>
			<Link href={`/filmItem/${film.imdbID}`} style={{}}>
				<button className={`${styles.itemBtn} ${styles.glow}`} data-glow>
					<span>Перейти</span>
				</button>
			</Link>
		</article>
	);
});

export default FilmItem;
