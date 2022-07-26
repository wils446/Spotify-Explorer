import style from "./Navbar.module.css";

const Navbar = () => {
	return (
		<>
			<div className={style.navbar}>
				<div className="grid grid-cols-5">
					<div>
						<span className={style["navbar-brand"]}>
							<span className="text-green-spotify">Spotify </span>
							Explorer
						</span>
					</div>
					<div className="col-span-3 w-full h-full text-center px-40">
						<input className={style["navbar-input"]} placeholder="&#xF002; Search" type="text" />
					</div>
					<div></div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
