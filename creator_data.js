function load_projects() {
	try {
		var string_count = parseInt(System.Gadget.Settings.readString("projects_count"));
		var projects_string = '';
		for (var i = 0; i < string_count; i++) {
			projects_string = projects_string.concat(System.Gadget.Settings.readString("projects_" + i));
		}
		projects = JSON.parse(projects_string);
		$('#projectTitle').attr('title',projects_string);
	} catch(e) {}
}

function save_projects() {
	var string_size = 200;
	try {
		var projects_string = JSON.stringify(projects);
		$('#projectTitle').attr('title',projects_string);
		for (var i = 0; i < projects_string.length / string_size; i++) {
			var partial_string = projects_string.substr(i * string_size, string_size);
			System.Gadget.Settings.writeString("projects_" + i, partial_string);
		}
		System.Gadget.Settings.writeString("projects_count", i);
	} catch(e) {}
}

function init_projects() {
	projects = [
		{
			"name":	"1.1. LIBISNet",
			"tag":	"lbsn",
			"activities":	[
				{ "name": "Andere",     "tag": "oth"  },
				{ "name": "Conversies", "tag": "conv" },
				{ "name": "Meetings",   "tag": "meet" },
				{ "name": "Projecten",  "tag": "pro"  },
				{ "name": "Prospects",  "tag": "pros" },
				{ "name": "Uitbating",  "tag": "uit"  }
			]
		},{
			"name":	"1.2. PBS Vlaams-Brabant",
			"tag":	"pbs",
			"activities":	[
				{ "name": "Andere",     "tag": "oth"  },
				{ "name": "Conversies", "tag": "conv" },
				{ "name": "Meetings",   "tag": "meet" },
				{ "name": "Projecten",  "tag": "pro"  },
				{ "name": "Prospects",  "tag": "pros" },
				{ "name": "Uitbating",  "tag": "uit"  }
			]
		},{
			"name":	"1.3. Open Vlacc",
			"tag":	"vlacc",
			"activities":	[
				{ "name": "Andere",     "tag": "oth"  },
				{ "name": "Conversies", "tag": "conv" },
				{ "name": "Meetings",   "tag": "meet" },
				{ "name": "Projecten",  "tag": "pro"  },
				{ "name": "Prospects",  "tag": "pros" },
				{ "name": "Uitbating",  "tag": "uit"  }
			]
		},{
			"name":	"2. Elektronische bronnen",
			"tag":	"eres",
			"activities":	[
				{ "name": "Andere",     "tag": "oth"  },
				{ "name": "Conversies", "tag": "conv" },
				{ "name": "Meetings",   "tag": "meet" },
				{ "name": "Projecten",  "tag": "pro"  },
				{ "name": "Prospects",  "tag": "pros" },
				{ "name": "Uitbating",  "tag": "uit"  }
			]
		},{
			"name":	"3. Lirias",
			"tag":	"lirias",
			"activities":	[
				{ "name": "Andere",     "tag": "oth"  },
				{ "name": "Associatie", "tag": "ass"  },
				{ "name": "Conversies", "tag": "conv" },
				{ "name": "Meetings",   "tag": "meet" },
				{ "name": "Projecten",  "tag": "pro"  },
				{ "name": "Prospects",  "tag": "pros" },
				{ "name": "Uitbating",  "tag": "uit"  }
			]
		},{
			"name":	"4. Lias",
			"tag":	"lias",
			"activities":	[
				{ "name": "Andere",     "tag": "oth"  },
				{ "name": "Conversies", "tag": "conv" },
				{ "name": "Meetings",   "tag": "meet" },
				{ "name": "Projecten",  "tag": "pro"  },
				{ "name": "Prospects",  "tag": "pros" },
				{ "name": "Uitbating",  "tag": "uit"  }
			]
		},{
			"name":	"6. Heron",
			"tag":	"heron",
			"activities":	[
				{ "name": "Andere",     "tag": "oth"  },
				{ "name": "Conversies", "tag": "conv" },
				{ "name": "Meetings",   "tag": "meet" },
				{ "name": "Projecten",  "tag": "pro"  },
				{ "name": "Prospects",  "tag": "pros" },
				{ "name": "Uitbating",  "tag": "uit"  }
			]
		},{
			"name":	"7. Limo",
			"tag":	"limo",
			"activities":	[
				{ "name": "Andere",     "tag": "oth"  },
				{ "name": "Conversies", "tag": "conv" },
				{ "name": "Meetings",   "tag": "meet" },
				{ "name": "Projecten",  "tag": "pro"  },
				{ "name": "Prospects",  "tag": "pros" },
				{ "name": "Uitbating",  "tag": "uit"  }
			]
		},{
			"name":	"9. Alma",
			"tag":	"alma",
			"activities":	[
				{ "name": "Andere",     "tag": "oth"  },
				{ "name": "Conversies", "tag": "conv" },
				{ "name": "Meetings",   "tag": "meet" },
				{ "name": "Projecten",  "tag": "pro"  },
				{ "name": "Prospects",  "tag": "pros" },
				{ "name": "Uitbating",  "tag": "uit"  }
			]
		},{
			"name":	"13. Diverse projecten",
			"tag":	"oth",
			"activities":	[
				{ "name": "Andere",            "tag": "oth"   },
				{ "name": "Europeana Inside", "tag": "inside" },
				{ "name": "Okapi",            "tag": "okapi"  }
			]
		},{
			"name":	"14. Vep (Vlaams E-book Platform)",
			"tag":	"vep",
			"activities":	[
				{ "name": "Andere",     "tag": "oth"  },
				{ "name": "Conversies", "tag": "conv" },
				{ "name": "Meetings",   "tag": "meet" },
				{ "name": "Projecten",  "tag": "pro"  },
				{ "name": "Uitbating",  "tag": "uit"  }
			]
		},{
			"name":	"99a. Intern LIBIS",
			"tag":	"libis",
			"activities":	[
				{ "name": "Andere",                                     "tag": "oth"    },
				{ "name": "Conferenties, congressen, lezingen etc.",    "tag": "conf"   },
				{ "name": "Events a.h.",                                "tag": "event"  },
				{ "name": "Expertise (literatuur en onderzoek)",        "tag": "expert" },
				{ "name": "IT Ondersteuning",                           "tag": "it"     },
				{ "name": "Klantenrelaties, account management etc.",   "tag": "klant"  },
				{ "name": "LIBIS financien",                            "tag": "fin"    },
				{ "name": "LIBIS personeel",                            "tag": "pers"   },
				{ "name": "LIBIS planning",                             "tag": "plan"   },
				{ "name": "Mails allerhande, administratie, prullaria", "tag": "admin"  },
				{ "name": "Meetings",                                   "tag": "meet"   },
				{ "name": "PR en marketing: folders, websites etc.",    "tag": "pr"     },
				{ "name": "Toepassingen zoals hd, pm, tt etc.",         "tag": "toep"   }
			]
		},{
			"name":	"99b. Inbedding KU Leuven",
			"tag":	"kul",
			"activities":	[
				{ "name": "Andere",                     "tag": "oth"  },
				{ "name": "Business cases en planning", "tag": "plan" },
				{ "name": "Meetings",                   "tag": "meet" },
				{ "name": "Projecten",                  "tag": "pro"  }
			]
		},{
			"name":	"99c. Associatie",
			"tag":	"assoc",
			"activities":	[
				{ "name": "Andere",   "tag": "oth"  },
				{ "name": "Meetings", "tag": "meet" }
			]
		},{
			"name":	"999. Rust",
			"tag":	"rust",
			"activities":	[
				{ "name": "Afwijkend gedrag > C4", "tag": "afwijking" },
				{ "name": "Verlof",                "tag": "verlof"    },
				{ "name": "Ziek",                  "tag": "ziek"      }
			]
		}
	];
}