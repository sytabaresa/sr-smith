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
		loading: "Loading",
		logout: "Logout",
		save: "Save",
		sign_up: "Sign Up",
		login: "Login",
		lang: "Language",
		theme: "Theme",
		help: "Help",
		close: "Close",
		code: "Code"
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
		image: "GPLv3 image"
	},
	about: {
		tesis: "Tesis",
		desc: "This software is product of my engineering tesis, you can see",
		here: "here",
	},
	theme: {

		dark: "Dark",
		light: "Light"
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
		password_match: "Passwords not match"
	},
	saved: {
		project_Description: "Project Description",
		project_name: "Project Name",
		create_project: "Create Project",
		prev_projects: "Previous Projects",
		no_projects: "No Projects Saved",
		delete: "Delete",
	},
	menu: {
		publish: "Publish",
		settings: "Settings",
		settings_large: "Setting",
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
		title: 'Smith Chart canvas',
		desc: 'An canvas with a smith chart, you can create points, lines, circles and other geometric contructs on top of it',
		run: "Run",
		smith_mode: "Smith Mode",
		move: "Move",
		delete: "Delete",
		undo: "Undo",
		show_menu: "Show Menu",
		elements_menu: "Elements Menu",
		create: "Create",
		code: "Code",
		placeholder: "Write code..."
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
		two_points: {
			desc: "Select two points"
		},
		three_points: {
			desc: "Select three points"
		},
		point: {
			title: "Point",
			desc: "Select position, line, curve, or other point"
		},
		arc: {
			title: "Arc",
			desc: "Select origin, fist point and point for angle"
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
		imcirclead: {
			title: "Imaginary Circle Admitance (Point)",
			tooltip: "Imaginary Circle Admitance (Point)"
		},
		recircle: {
			title: "Real Circle (Point)"
		},
		recirclead: {
			title: "Real Circle Admitance (Point)",
			tooltip: "Real Circle Admitance (Point)"
		},
		semicircle: {
			title: "Semicircle"
		},
		circle_point: {
			title: "Circle (center, point)",
		},
		circle_radius: {
			title: "Circle (center, radius)",
			desc: "Select center point, then enter radius"
		},
		circumcircle: {
			title: "Circumcircle",
		}
	}
}

export default en

