import type { Translation } from '../i18n-types'

const en: Translation = {
	// this is an example Translation, just rename or delete this folder if you want
	app: {
		title: "Sr Smith",
		main_title: "Hello Sr Smith App 👋",
		smith_app: "Smith App",
	},
	common: {
		back: "Back",
		done: "Done",
		new: "New",
		home: "Home",
		users: "Users",
		required_field: "Required Field",
		change_locale: "Change Locale",
		loading: "Locale",
		logout: "Logout",
		save: "Save",
		sign_up: "Sign Up",
		login: "Login",
		lang: "Language",
	},
	offline: {
		app_ready: 'App ready to work offline',
		new_content: 'New content available, click on reload button to update',
		reload: 'Reload',
		close: 'Close',
	},
	license: {
		work: "This work is under",
		license: "Licence GPL (GNU General Public License) version 3",
		authors: "Authors",
	},
	login: {
		username: "Username",
		email: "Email",
		email_required: "Required email",
		password: "Password",
		password_required: "Password Required",
		google_login: "Login with Google",
		repeat_password: "Repeat Password",
		login: "Login",
		sign_up: "Sign Up",
		logging_in: "Logging In",
		done: "Done",

	},
	saved: {
		project_Description: "Project Description",
		project_name: "Project Name",
		create_project: "Create Project",
		prev_projects: "Previous Projects",
		no_projects: "No Projects Saved",
	},
	menu: {
		publish: "Publish",
		settings: "Settings",
		open: "Open",
		login: "Login",
		new: "New",
		logout: "Logout",
	},
	apps: {
		circuit_automata: "Circuit Autómata",
		antenna_patterns: "Antenna Patterns",
	},
	canvas: {
		run: "Run",
		smith_mode: "Smith Mode",
		move: "Move",
		delete: "Delete",
		undo: "Undo",
		show_menu: "Show Menu",
		create: "Create",
		code: "Code"
	},
	settings: {
		make_public: "Make Public",
		precision: "Precision",
	},
	project: {
		name: "Project Name",
		done: "Done",
		creating: "Creating",
		create: "Create",
		description: "Project description"
	},
	tools: {
		common: {
			two_points: "Select two points",
			three_points: "Select three points"
		},
		point: {
			title: "Point",
			desc: "Select position, line, curve, or other point"
		},
		arc: {
			title: "Arc",
			desc: "Select origin,fist point and point for angle"
		},
		segment: {
			title: "Segment"
		},
		line: {
			title: "Line"
		},
		imcircle: {
			title: "Imaginary Circle (Point)"
		},
		recicle: {
			title: "Real Circle (Point)"
		},
		semicircle: {
			title: "Semicircle"
		},
		circle_point: {
			title: "Circle (center, point)",
			desc: ""
		},
		circle_radius: {
			title: "Circle (center, radius)",
			desc: "Select center point, then enter radius"
		}
	}
}

export default en

