import clsx from "clsx"
import { FC, PropsWithChildren } from "react";

import styles from "./Mobile.layout.module.scss";
import { NavLink } from "react-router";

const NAVIGATION: ReadonlyArray<{
	Icon: string;
	Caption: string;
	Href: string;
}> = [
	{
		Href: "/home",
		Caption: "Главный",
		Icon: "home_app_logo",
	},
	{
		Href: "/files",
		Caption: "Файлы",
		Icon: "folder",
	},
	{
		Href: "/add",
		Caption: "Создать",
		Icon: "add_circle",
	},
	{
		Href: "/search",
		Caption: "Поиск",
		Icon: "search",
	},
	{
		Href: "/profile",
		Caption: "Профиль",
		Icon: "id_card",
	},
];

export const MobileLayout: FC<PropsWithChildren> = ({
	children,
}) => {
	const $nav = NAVIGATION.map((item) => {
		return (
			<NavLink to={ item.Href } className={clsx(styles.navItem)}>
				<span className={styles.navIcon + " material-symbols-outlined"}>
					{ item.Icon }
				</span>
				<span className={styles.navCaption}>
					{ item.Caption }
				</span>
			</NavLink >
		);
	});

	return (
		<div className={ styles.layout }>
			{ children }
			<div className={ styles.nav }>
				{ $nav }
			</div>
		</div>
	);
};

export function WithMobileLayout(Component: FC | JSX.Element): JSX.Element {
	return (
		<MobileLayout>
			{ typeof Component === "function" ? <Component /> : Component }
		</MobileLayout>
	);
}
