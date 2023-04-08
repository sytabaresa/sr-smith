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
	},
	offline: {
		app_ready: 'App lista para funcionar offline',
		new_content: 'Nuevo contenido disponeble, click en el boton de Recargar para actualizar',
		reload: 'Recargar',
		close: 'Cerrar',
	},
	license: {
		work: "Este trabajo está bajo",
		license: "Licencia GPL (GNU General Public License) versión 3",
		authors: "Autores",
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
		open: "Abrir",
		login: "Login",
		logout: "Logout"
	},
	apps: {
		circuit_automata: "Circuit Autómata",
		antenna_patterns: "Antenna Patterns",
	},
	canvas: {
		run: "Run",
		smith_mode: "Modo Smith",
		move: "Mover",
		delete: "Borrar",
		undo: "Atrás",
		show_menu: "Ver menú",
		create: "Crear",
		code: "Code",
		placeholder: "Escribir código..."
	},
	settings: {
		make_public: "Hacer público",
		precision: "Precisión",
	},
	tools: {
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
		recicle: {
			title: "Círculo Real (Punto)"
		},
		semicircle: {
			title: "Semicírculo"
		},
		circle_point: {
			title: 	"Círculo (centro, punto)",
			desc: ""
		},
		circle_radius: {
			title: "Círculo (centro, radio)",
			desc: "Selecciones punto de centro, luego ingrerse radio"
		}
	},
}

export default es
