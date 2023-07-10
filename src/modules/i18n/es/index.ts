import type { BaseTranslation } from '../i18n-types'

const es: BaseTranslation = {
	// this is an example Translation, just rename or delete this folder if you want
	app: {
		title: "Sr Smith",
		main_title: "Hola Sr Smith App 👋",
		smith_app: "Smith App",
	},
	common: {
		back: "Atrás",
		done: "Hecho",
		new: "Nuevo",
		home: "Home",
		users: "Usuarios",
		required_field: "Campo Requerido",
		change_locale: "Cambiar Local",
		loading: "Cargando",
		logout: "Logout",
		save: "Guardar",
		sign_up: "Registrarse",
		login: "Login",
		lang: "Lenguaje",
		theme: "Tema",
		help: "Ayuda",
		close: "Cerrar",
		code: "Código",
		main_nav: "Navegación Principal",
		profile_picture: "Imagen de perfil"
	},
	offline: {
		app_ready: 'App lista para funcionar offline',
		new_content: 'Nuevo contenido disponeble, click en el boton de Recargar para actualizar',
		reload: 'Recargar',
		close: 'Cerrar',
	},
	lang: {
		es: "Español",
		en: "English",
	},
	license: {
		work: "Este trabajo está bajo",
		license: "Licencia GPL (GNU General Public License) versión 3",
		authors: "Autores",
		image: "Imagen GPLv3"
	},
	about: {
		tesis: "Tesis",
		desc: "Este software es un producto derivado del código que mi colega y yo publicamos como tesis de ingeniería, puedes verla",
		here: "aqui"
	},
	theme: {
		dark: "Oscuro",
		light: "Claro"
	},
	login: {
		username: "Usuario",
		email: "Email",
		email_required: "Email Requerido",
		password: "Contraseña",
		password_required: "Contraseña Requerida",
		google_login: "Iniciar por Google",
		repeat_password: "Repita Contraseña",
		sign_up: "Registrarse",
		login: "Login",
		logging_in: "Loguéandose",
		done: "Hecho",
		password_match: "Contraseñas no concuerdan"
	},
	saved: {
		project_Description: "Descripcion del Projecto",
		project_name: "Nombre del Projecto",
		create_project: "crear proyecto",
		prev_projects: "Proyectos Anteriores",
		no_projects: "No tienes proyectos guardados",
		delete: "Borrar",
	},
	project: {
		name: "Nombre del Projecto",
		done: "Hecho",
		creating: "Creando",
		create: "Crear",
		description: "Descripción del projecto"
	},
	menu: {
		new: "Nuevo",
		publish: "Publicar",
		settings: "Configs",
		settings_large: "Configuraciones",
		open: "Abrir",
		login: "Login",
		logout: "Logout"
	},
	apps: {
		circuit_automata: "Circuit Autómata",
		antenna_patterns: "Antenna Patterns",
	},
	canvas: {
		title: "Canvas Carta de Smith",
		desc: "Un canvas con una Carta de Smith, puedes crear puntos, líneas, curvas y otros constructores geométricos en él",
		run: "Correr",
		smith_mode: "Modo Smith",
		move: "Mover",
		delete: "Borrar",
		undo: "Atrás",
		show_menu: "Ver menú",
		elements_menu: "Menú de elementos",
		nav_menu: "Navigation menu",
		create: "Crear",
		code: "Code",
		placeholder: "Escribir código...",
		read_only: 'solo lectura',
		fail: 'fallo',
		uploading: 'subiendo',
		follow_link: 'Seguir link',
		ctrl_click: 'ctrl+click',
		warning: 'atención',
		error: 'error',
	},
	settings: {
		make_public: "Hacer público",
		precision: "Precisión",
	},
	tools: {
		menu: 'Menu de elementos expandido',
		common: {
			two_points: "Seleccione dos puntos",
			three_points: "Seleccione tres puntos"
		},
		point: {
			title: "Punto",
			desc: "Seleccione posición, línea, curva u otro punto",
		},
		arc: {
			title: "Arco",
			desc: "Seleccione el origen, primer punto y punto del ángulo"
		},
		segment: {
			title: "Segmento"
		},
		line: {
			title: "Línea"
		},
		imcircle: {
			title: "Círculo Imaginario (Punto)"
		},
		imcirclead: {
			title: "Círculo Imaginario de Admitacia (Punto)",
		},
		recircle: {
			title: "Círculo Real (Punto)"
		},
		recirclead: {
			title: "Círculo Real de Admitancia (Punto)",
		},
		semicircle: {
			title: "Semicírculo"
		},
		circle_point: {
			title: "Círculo (centro, punto)",
			desc: ""
		},
		circle_radius: {
			title: "Círculo (centro, radio)",
			desc: "Selecciones punto de centro, luego ingrerse radio"
		},
		circumcircle: {
			title: "Circumcírculo"
		}
	},
}

export default es
