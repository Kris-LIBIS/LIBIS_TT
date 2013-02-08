var settings_max_string_size = 1000;

// ==================== PROJECTS ====================

function load_projects() {
	try {
		// last save date
		var expire = moment(System.Gadget.Settings.readString("projects_expire"));
		if (expire) { projects_expire = expire; }
		// get number of sub-strings
		var string_count = parseInt(System.Gadget.Settings.readString("projects_count"));
		// get sub-strings and reassemble original string
		var string = '';
		for (var i = 0; i < string_count; i++) {
			string = string.concat(System.Gadget.Settings.readString("projects_" + i));
		}
		// parse string into JSON object
		projects = JSON.parse(string);
	} catch(e) {}
}

function save_projects() {
	try {
		// sort projects
		sort_projects();
		// convert array to string (JSON notation)
		var string = JSON.stringify(projects);
		// split string into substrings and save each one in settings
		for (var i = 0; i < string.length / settings_max_string_size; i++) {
			var partial_string = string.substr(i * settings_max_string_size, settings_max_string_size);
			System.Gadget.Settings.writeString("projects_" + i, partial_string);
		}
		// save nummber of substrings
		System.Gadget.Settings.writeString("projects_count", i);
		// last save date
		projects_expire = moment().add('days', 5);
		System.Gadget.Settings.writeString("projects_expire", projects_expire.format());
	} catch(e) {}
}

function sort_projects(){
	projects = projects.sort(function(a,b) {
		var regex = /^(\d+)(\.|[a-z])(\d)?/

		a.name.match(regex);
		var nA = parseInt(RegExp.$1,10);
		var cA = RegExp.$2;
		var n2A = 0;
		if (cA == '.') {
			n2A = parseInt(RegExp.$3,10);
		}

		b.name.match(regex);
		var nB = parseInt(RegExp.$1,10);
		var cB = RegExp.$2;
		var n2B = 0;
		if (cB == '.') {
			n2B = parseInt(RegExp.$3,10);
		}

		if (nA == nB) {
			if (cA == cB) {
				return n2A == n2B ? 0 : n2A > n2B ? 1 : -1;
			}
			return cA == cB ? 0 : cA > cB ? 1 : -1;
		}
		return nA > nB ? 1 : -1;
	});
}

// ==================== INSTITUTIONS ====================

function load_institutions() {
	try {
		// last save date
		var expire = moment(System.Gadget.Settings.readString("institutions_expire"));
		if (expire) { institutions_expire = expire; }
		// == INSTITUTIONS ==
		// get number of sub-strings
		var string_count = parseInt(System.Gadget.Settings.readString("institutions_count"));
		// get sub-strings and reassemble original string
		var string = '';
		for (var i = 0; i < string_count; i++) {
			string = string.concat(System.Gadget.Settings.readString("institutions_" + i));
		}
		// parse string into JSON object
		institutions = JSON.parse(string);
		// == SUBPROJECTS ==
		// get number of sub-strings
		var string_count = parseInt(System.Gadget.Settings.readString("subprojects_count"));
		// get sub-strings and reassemble original string
		var string = '';
		for (var i = 0; i < string_count; i++) {
			string = string.concat(System.Gadget.Settings.readString("subprojects_" + i));
		}
		// parse string into JSON object
		subprojects = JSON.parse(string);
	} catch(e) {}
}

function save_institutions() {
	try {
	
		// == INSTITUTIONS ==
		// sort institutions
		sort_institutions();
		// convert array to string (JSON notation)
		var string = JSON.stringify(institutions);
		// split string into substrings and save each one in settings
		for (var i = 0; i < string.length / settings_max_string_size; i++) {
			var partial_string = string.substr(i * settings_max_string_size, settings_max_string_size);
			System.Gadget.Settings.writeString("institutions_" + i, partial_string);
		}
		// save nummber of substrings
		System.Gadget.Settings.writeString("institutions_count", i);
		
		// == SUBPROJECTS ==
		// sort subprojects
		sort_subprojects();
		// convert array to string (JSON notation)
		var string = JSON.stringify(subprojects);
		// split string into substrings and save each one in settings
		for (var i = 0; i < string.length / settings_max_string_size; i++) {
			var partial_string = string.substr(i * settings_max_string_size, settings_max_string_size);
			System.Gadget.Settings.writeString("subprojects_" + i, partial_string);
		}
		// save nummber of substrings
		System.Gadget.Settings.writeString("subprojects_count", i);
		
		// == last save date ==
		institutions_expire = moment().add('days', 5);
		System.Gadget.Settings.writeString("institutions_expire", institutions_expire.format());
		
	} catch(e) {}
}

function sort_institutions() {
	institutions = institutions.sort(function(a,b) { return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)); });
}

function sort_subprojects() {
	subprojects = subprojects.sort(function(a,b) { return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)); });
}

// ==================== FAVORITES ====================

var favorites_max_size = 15;

function load_favorites() {
	try {
		favorites = JSON.parse(System.Gadget.Settings.readString("favorites"));
	} catch(e) {}
}

function save_favorites() {
	try {
		System.Gadget.Settings.writeString("favorites", JSON.stringify(favorites));
	} catch(e) {}
}

function add_to_favorites(item) {
	var found = find_in_array(favorites, item);
	for (var i = Math.min(favorites_max_size, found); i > 0;) {
		favorites[i] = favorites[--i];
	}
	favorites[0] = item;
}

function is_favorite(item) {
	var found = find_in_array(favorites, item);
	return found < favorites.length;
}

function find_in_array(array, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] === value) {
			return i;
		}
		if (array[i].tag === value) {
			return i;
		}
	}
	return i;
}
