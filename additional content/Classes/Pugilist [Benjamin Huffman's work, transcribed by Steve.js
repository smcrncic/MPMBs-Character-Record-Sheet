/*	-WHAT IS THIS?-
	The script featured here is made as an optional addition to "MPMB's Character Record Sheet" found at http://flapkan.com/mpmb/dmsguild
	You can add the content to the Character Sheet's functionality by adding the script below in the "Add Custom Script" dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, but you have to add the code in at once (i.e. copy all the code into a single, long file and copy that into the sheet).
	It is recommended to enter the code in a fresh sheet before adding any other information.
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds a class called "Pugilist" (v1.1) and the five subclasses for it: "Club of the Squared Circle" and "Club of the Sweet Science" from the Pugilist class PDF, and "Club of the Arena Royale", "Club of the Bloodhound Bruisers", and "Club of the Salt and Vinegar" from the Additional Fight Clubs for the Pugilist Class PDF
	
				This is taken from the DMs Guild website (http://www.dmsguild.com/product/184921/)
				This class and subclasses are made by Benjamin Huffman
				
				The script also includes the "Additional Fight Clubs for the Pugilist Class" (v2), which is taken from http://www.dmsguild.com/product/186640/
				
	Code by:	tables-r-us & MorePurpleMoreBetter
	Date:		2017-09-25 (sheet v12.998)

	Please support the creator of this content (Benjamin Huffman) and download his material from the DMs Guild website: http://www.dmsguild.com/browse.php?x=0&y=0&author=Benjamin%20Huffman
	
	Please take note that some features of the Pugilist class are unique and not supported by the character sheet, such as adding Constitution modifier to AC instead of Dexterity when wearing light armour.
*/

ClassList["pugilist"] = {
	regExpSearch : /pugilist/i,
	name : "Pugilist",
	source : ["BH:PC", 3],
	primaryAbility : "\n \u2022 Pugilist: Strength;",
	prereqs : "\n \u2022 Pugilist: Strength 13 and Constitution 13;",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 8,
	saves : ["Str", "Con"],
	toolProfs : {
		primary : [["Drum", 0]]
	},
	skills : ["\n\n" + toUni("Pugilist") + ": Choose two skills from Acrobatics, Athletics, Deception, Intimidation, Perception, Sleight of Hand, and Stealth."],
	armor : [
		[true, false, false, false]
	],
	weapons : [
		[true, false, ["improvised weapon", "whip", "hand crossbow"]]
	],
	equipment : "Pugilist starting equipment:\n \u2022  Leather armor -or- any simple weapon;\n \u2022 A dungeoneer's pack -or- an explorer's pack;\n \u2022 A set of artisan's tools -or- a gaming set -or- thieves' tools\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Fight Club", ["club of the squared circle", "club of the sweet science", "club of the arena royale", "club of the bloodhound bruisers", "club of the salt and vinegar"]],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	features : {
		"fisticuffs" : {
			name : "Fisticuffs",
			source : ["BH:PC", 4],
			minlevel : 1,
			description : "\n   " + "Pugilist weapons: improvised weapon, whip, simple weapon (not two-handed/heavy), unarmed strike" + "\n   " + "With these, I must use Str to use the Fisticuffs damage die" + "\n   " + "When taking an Attack action with these, I get one unarmed strike or grapple as a bonus action",
			additional : levels.map(function (n) {
				if (n < 5) return "1d6";
				if (n < 11) return "1d8";
				if (n < 17) return "1d10";
				return "1d12";
			}),
			action : ["bonus action", " (with Attack action)"],
			eval : "AddString('Extra.Notes', 'Pugilist features:\\n\\u25C6 Lose Fisticuffs and Iron Chin with medium armor\/heavy armor\/shields', true);",
			removeeval : "RemoveString('Extra.Notes', 'Pugilist features:\\n\\u25C6 Lose Fisticuffs and Iron Chin with medium armor\/heavy armor\/shields', true);",
			calcChanges : {
				atkAdd : ["var pugilistDie = function(n) {return n < 5 ? 6 : n < 11 ? 8 : n < 17 ? 10 : 12;}; if (classes.known.pugilist && classes.known.pugilist.level && theWea && ((/whip|improvised weapon|unarmed strike/i).test(theWea.name) || (isMeleeWeapon && (/simple/i).test(theWea.type) && !(/\\b(heavy|(2|two).?hand(ed)?s?)\\b/i).test(theWea.description)))) {var aPugilistDie = pugilistDie(classes.known.pugilist.level); try {var curDie = eval(fields.Damage_Die.replace('d', '*'));} catch (e) {var curDie = 'x';}; if (isNaN(curDie) || curDie < aPugilistDie) {fields.Damage_Die = '1d' + aPugilistDie;}; fields.Mod = 1;}; ", "I can use my Fisticuffs damage die in place of the normal damage die for any 'Pugilist Weapons', which include unarmed strike, whip, improvised weapon, and any simple melee weapon that is not two-handed or heavy. If I use the Pugilist damage die, I must use Strength with that weapon."]
			}
		},
		"iron chin" : {
			name : "Iron Chin",
			source : ["BH:PC", 4],
			minlevel : 1,
			description : "\n   " + "While wearing light or no armor and no shield, I can add my constitution modifier instead of my dexterity modifier to determine my armor class"
		},
		"moxie" : {
			name : "Moxie",
			source : ["BH:PC", 4],
			minlevel : 2,
			description : "\n   " + "I can spend moxie to fuel special actions (see third page)",
			usages : ["", 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 12],
			recovery : "short rest",
			extraname : "Moxie Feature",
			"brace up" : {
				name : "Brace up",
				source : ["BH:PC", 4],
				description : " [1 moxie point]" + "\n   " + "I can roll my fisticuffs die and gain temporary hit points equal to the number rolled + my pugilist level + my Constitution modifier.",
				action : ["bonus action", ""]
			},
			"the old one-two" : {
				name : "The Old One-Two",
				source : ["BH:PC", 4],
				description : " [1 moxie point]" + "\n   " + "After taking the Attack action, I can make 2 unarmed attacks as a bonus action",
				action : ["bonus action", "(after Attack action)"]
			},
			"stick and move" : {
				name : "Stick and Move",
				source : ["BH:PC", 4],
				description : " [1 moxie point]" + "\n   " + "As a bonus action, I can either Dash or or make a shove attack.",
				action : ["bonus action", ""]
			},
			eval : "ClassFeatureOptions(['pugilist', 'moxie', 'brace up', 'extra']); ClassFeatureOptions(['pugilist', 'moxie', 'the old one-two', 'extra']); ClassFeatureOptions(['pugilist', 'moxie', 'stick and move', 'extra']);",
			removeeval : "ClassFeatureOptions(['pugilist', 'moxie', 'brace up', 'extra'], 'remove'); ClassFeatureOptions(['pugilist', 'moxie', 'the old one-two', 'extra'], 'remove'); ClassFeatureOptions(['pugilist', 'moxie', 'stick and move', 'extra'], 'remove');",
		},
		"street smart" : {
			name : "Street Smart",
			source : ["BH:PC", 4],
			minlevel : 2,
			description : "\n   " + "Once I have caroused in a settlement for 8 hours or more, I know all public locations in the city as if I were born and raised there and cannot be lost by non-magical means while within the city."
		},
		"bloodied but unbowed" : {
			name : "Bloody but Unbowed",
			source : ["BH:PC", 4],
			minlevel : 3,
			description : "\n   " + "When I am reduced to less than half of my maximum hit points, I gain temporary hit points equal to my pugilist level + my Constitution modifier, and regain all expended moxie points.",
			usages : [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			recovery : "short rest"
		},
		"subclassfeature3" : {
			name : "Fight Club",
			source : ["BH:PC", 4],
			minlevel : 3,
			description : "\n   " + "Choose a Fight Club to train in and put it in the \"Class\" field on page 1" + "\n   " + "Choose either the Squared Circle, the Sweet Science, the Arena Royale, the Bloodhound Bruisers, or the Salt and Vinegar"
		},
		"dig deep" : {
			name : "Dig Deep",
			source : ["BH:PC", 4],
			minlevel : 4,
			description : "\n   " + "As a bonus action, I gain resistance to bludgeoning, piercing, and slashing damage for one minute. At the end of that minute, I gain a level of exhaustion.",
			action : ["bonus action", ""],
			dmgres : [["Bludgeoning", "Bludgeon. (dig deep)"], ["Piercing", "Piercing (dig deep)"], ["Slashing", "Slashing (dig deep)"]]
		},
		"haymaker" : {
			name : "Haymaker",
			source : ["BH:PC", 5],
			minlevel : 5,
			description : "\n   " + "When I take the attack action with pugilist weapons and am not suffering disadvantage, I can choose to swing haymakers. I make all attacks during this turn with disadvantage. I deal maximum damage if an attack hits."
		},
		"moxie-fueled fists" : {
			name : "Moxie-Fueled Fists",
			source : ["BH:PC", 5],
			minlevel : 6,
			description : "\n   " + "My unarmed strikes count as magical for overcoming resistances and immunities",
			calcChanges : {
				atkAdd : ["if ((/unarmed strike/i).test(WeaponName)) {fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';}; ", "My unarmed strikes count as magical for overcoming resistances and immunities."]
			}
		},
		"fancy footwork" : {
			name : "Fancy Footwork",
			source : ["BH:PC", 5],
			minlevel : 7,
			description : "\n   " + "I am proficient with Dex saves",
			saves : ["Str", "Dex", "Con"]
		},
		"shake it off" : {
			name : "Shake it Off",
			source : ["BH:PC", 5],
			minlevel : 7,
			description : "\n   " + "As an action, I can end one effect on me that causes me to be charmed or frightened",
			action : ["action", ""]
		},
		"down but not out" : {
			name : "Down but Not Out",
			source : ["BH:PC", 5],
			minlevel : 9,
			description : "\n   " + "When I use my Bloody but Unbowed feature, I can choose to add my proficiency bonus to my damage with unarmed attacks and pugilist weapons for the next minute.",
			usages : [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			recovery : "long rest"
		},
		"school of hard knocks" : {
			name : "School of Hard Knocks",
			source : ["BH:PC", 5],
			minlevel : 10,
			description : "\n   " + "I gain resistance to psychic damage and advantage on saving throws against effects that would make me stunned or unconscious.",
			dmgres : ["Psychic"]
		},
		"rabble rouser" : {
			name : "Rabble Rouser",
			source : ["BH:PC", 5],
			minlevel : 13,
			description : "\n   " + "After carousing, I gain advantage on all Charisma (Persuasion) and Charisma (Intimidation) rolls made against the people who live in the city."
		},
		"unbreakable" : {
			name : "Unbreakable",
			source : ["BH:PC", 5],
			minlevel : 14,
			description : "\n   " + "I have advantage on Strength, Dexterity, and Constitution saving throws; I can reroll a failed save once by spending 1 moxie point"
		},
		"herculean" : {
			name : "Herculean",
			source : ["BH:PC", 5],
			minlevel : 15,
			description : "\n   " + "My carrying capacity is doubled, my jump height and distance are doubled, and when I deal damage to an inanimate object that damage is doubled."
		},
		"fighting spirit" : {
			name : "Fighting Spirit",
			source : ["BH:PC", 5],
			minlevel : 18,
			description : "\n   " + "When I have 4 levels of exhaustion or fewer and am reduced to 0 hit points, I regain half of my maximum hit points, half of my maximum moxie points, and I gain a level of exhaustion.",
			usages : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			recovery : "long rest"
		},
		"peak physical condition" : {
			name : "Peak Physical Condition",
			source : ["BH:PC", 5],
			minlevel : 20,
			description : "\n   " + "My Strength and Constitution ability scores increase by 2 to a maximum of 22. I recover 2 levels of exhaustion instead of 1 and regain all expended hit dice after a long rest."
		}
	}
};
	
ClassSubList["club of the squared circle"] = {
	regExpSearch : /^(((?=.*pugilist)(?=.*squared)(?=.*circle))|(?=.*wrestler)).*$/i,
	subname : "Club of the Squared Circle",
	fullname : "Pugilist (Squared Circle)",
	source : ["BH:PC", 5],
	features : {
		"subclassfeature3" : {
			name : "Groundwork",
			source : ["BH:PC", 5],
			minlevel : 3,
			description : "\n   " + "I know special moves and can use them by spending moxie.",
			extraname : "Groundwork",
			eval : "ClassFeatureOptions(['pugilist', 'subclassfeature3', 'compression lock', 'extra']); ClassFeatureOptions(['pugilist', 'subclassfeature3', 'quick pin', 'extra']); ClassFeatureOptions(['pugilist', 'subclassfeature3', 'to the mat', 'extra']);",
			removeeval : "ClassFeatureOptions(['pugilist', 'subclassfeature3', 'compression lock', 'extra'], 'remove'); ClassFeatureOptions(['pugilist', 'subclassfeature3', 'quick pin', 'extra'], 'remove'); ClassFeatureOptions(['pugilist', 'subclassfeature3', 'to the mat', 'extra'], 'remove');",
			"compression lock" : {
				name : "Compression Lock",
				source : ["BH:PC", 5],
				description : " [1 moxie point]" + "\n   " + "When a creature attempts to break a grapple with me and succeeds, I can spend 1 moxie point to force the creature to roll again. The creature must use the second result.",
				action : ["reaction", ""]
			},
			"quick pin" : {
				name : "Quick Pin",
				source : ["BH:PC", 4],
				description : " [1 moxie point]" + "\n   " + "I can grapple as an opportunity attack",
				action : ["reaction", "(Opportunity Attack)"]
			},
			"to the mat" : {
				name : "To the Mat",
				source : ["BH:PC", 4],
				description : " [1 moxie  point]" + "\n   " + "As a bonus action, I make a grapple attack against a creature within range. If successful, the creature is also knocked prone..",
				action : ["bonus action", ""]
			}
		},
		"subclassfeature6" : {
			name : "Meat Shield",
			source : ["BH:PC", 5],
			minlevel : 6,
			description : "\n   " + "While grappling an enemy creature, I gain half cover against all attacks made against me by creatures I am not grappling. When a weapon attack made by a creature I am not grappling misses me, I may use my reaction and spend 1 moxie point to have that creature make the same attack with a new roll against an enemy creature I am grappling",
			action : ["reaction", " (while grappling)"]
		},
		"subclassfeature11" : {
			name : "Heavyweight",
			source : ["BH:PC", 5],
			minlevel : 11,
			description : "\n   " + "I count as one size larger for the purposes of grappling. I can move my full movement speed when I am dragging or carrying a grappled creature my size or smaller."
		},
		"subclassfeature17" : {
			name : "Clean Finish",
			source : ["BH:PC", 6],
			minlevel : 17,
			description : "\n   " + "While I have a creature grappled, I gain advantage on all attacks against it. When I make an unarmed strike or pugilist weapon attack against a creature I have grappled, I score a critical hit on a roll of 19 or 20",
		}
	}
};

ClassSubList["club of the sweet science"] = {
	regExpSearch : /^(((?=.*pugilist)(?=.*sweet)(?=.*science))|(?=.*boxer)).*$/i,
	subname : "Club of the Sweet Science",
	fullname : "Pugilist (Sweet Science)",
	source : ["BH:PC", 6],
	features : {
		"subclassfeature3" : {
			name : "Cross Counter",
			source : ["BH:PC", 6],
			minlevel : 3,
			description : "\n   " + "I can use my reaction and spend 2 moxie points to reduce the damage of a melee weapon attack by 1d10 + my Strength modifier + my pugilist level. If I reduce the damage to 0, I can make an unarmed strike or pugilist weapon attack against a creature within range as part of the same reaction.",
			action : ["reaction", ""]
		},
		"subclassfeature6" : {
			name : "One, Two, Three, Floor",
			source : ["BH:PC", 6],
			minlevel : 6,
			description : "\n   " + "If I use the Old One-Two and both attacks are successful, I can immediately spend 1 moxie point to make an additional attack with an unarmed strike as part of that bonus action. If I hit with this additional attack, I deal no damage and the creature is knocked prone.",
		},
		"subclassfeature11" : {
			name : "Float Like a Butterfly, Sting Like a Bee",
			source : ["BH:PC", 6],
			minlevel : 11,
			description : "\n   " + "When I reduce damage from an attack to 0 and successfully hit an enemy creature using my Cross Counter feature, I regain 1 moxie point"
		},
		"subclassfeature17" : {
			name : "Knock Out",
			source : ["BH:PC", 6],
			minlevel : 17,
			description : "\n   " + "When I hit with an unarmed strike or pugilist weapon, I can spend 1 or more moxie points to try to knock out the opponent instead of dealing damage. Roll 3d12 + 1d12 for every moxie point spent after the first + my pugilist level; if the total is equal to or greater than the creature's remaining hit points, it is unconscious for 10 minutes"
		}
	}
};

ClassSubList["club of the arena royale"] = {
	regExpSearch : /^(((?=.*pugilist)(?=.*arena)(?=.*royale))|(?=.*luchador)).*$/i,
	subname : "Club of the Arena Royale",
	fullname : "Pugilist (Arena Royale)",
	source : ["BH:AFC", 2],
	features : {
		"subclassfeature3" : {
			name : "Persona Libre",
			source : ["BH:AFC", 2],
			minlevel : 3,
			description : "\n   " + "I can create an alternate persona that I can adopt or discard as an action. I can make a Charisma (Disguise Kit) ability check with advantage. Creatures with passive Insight lower than the result of that roll will not recognize me." + "\n   " + "While I have adopted my alternate persona and not wearing any armor or using a shield, my Armor Class equals 10 + my Dexterity modifier + my Constitution modifier.",
			action : ["action", ""]
		},
		"subclassfeature6" : {
			name : "Work the Crowd",
			source : ["BH:AFC", 2],
			minlevel : 6,
			description : "\n   " + "While I have adopted my alternate persona, I can make a Charisma (Performance) ability check and inspire adoration or fear. All creatures within 30 feet who can see me must succeed on a Wisdom saving throw against that ability check result or be charmed or frightened for the next minute.",
			action : ["action", ""],
			usages : [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			recovery : "long rest"
		},
		"subclassfeature11" : {
			name : "High Flyer",
			source : ["BH:AFC", 2],
			minlevel : 11,
			description : "\n   " + "While I have adopted my alternate persona, my base movement increases by 10 feet, my jump distance is tripled, and I can use my bonus action to take the Dash action"
		},
		"subclassfeature17" : {
			name : "Signature Move",
			source : ["BH:AFC", 2],
			minlevel : 17,
			description : "\n   " + "I can create a signature move. When you use my signature move, I jump 15 feet and make an attack roll against a creature in range of your attack. If I hit, the attack is a critical and the creature is stunned until the end of its next turn. Unless I reduce a creature to 0 hit points with my Signature Move, I must finish a long rest before I can use it again"
		}
	}
};

ClassSubList["club of the bloodhound bruisers"] = {
	regExpSearch : /^(((?=.*pugilist)(?=.*bloodhound)(?=.*bruisers))|(?=.*enforcer)).*$/i,
	subname : "Club of the Bloodhound Bruisers",
	fullname : "Pugilist (Bloodhound Bruisers)",
	source : ["BH:AFC", 3],
	features : {
		"subclassfeature3" : {
			name : "Detective Work",
			source : ["BH:AFC", 3],
			minlevel : 3,
			description : "\n   " + "Choose two from Insight, Perception and Investigation. I gain proficiency in those skills. I also gain special moxie features",
			skillstxt : "\n\n" + toUni("Pugilist") + ": Choose two from Insight, Perception and Investigation.",
			extraname : "Detective Work",
			eval : "ClassFeatureOptions(['pugilist', 'subclassfeature3', 'forensic specialist', 'extra']); ClassFeatureOptions(['pugilist', 'subclassfeature3', 'keen observer', 'extra']); ClassFeatureOptions(['pugilist', 'subclassfeature3', 'living lie detector', 'extra']);",
			removeeval : "ClassFeatureOptions(['pugilist', 'subclassfeature3', 'forensic specialist', 'extra'], 'remove'); ClassFeatureOptions(['pugilist', 'subclassfeature3', 'keen observer', 'extra'], 'remove'); ClassFeatureOptions(['pugilist', 'subclassfeature3', 'living lie detector', 'extra'], 'remove');",
			"forensic specialist" : {
				name : "Forensic Specialist",
				source : ["BH:AFC", 3],
				description : " [1 moxie point]" + "\n   " + "When examining a scene of violence, I can spend 1 Moxie point to gain advantage on any Intelligence (Investigation) ability check.",
			},
			"keen observer" : {
				name : "Keen Observer",
				source : ["BH:AFC", 3],
				description : " [1 moxie point]" + "\n   " + "When I make a Wisdom (Perception) ability check in a settlement, I can spend 1 Moxie point to gain advantage on that roll.",
			},
			"living lie detector" : {
				name : "Living Lie Detector",
				source : ["BH:AFC", 3],
				description : " [1 moxie point]" + "\n   " + "When I make a Wisdom (Insight) ability check to determine whether a creature is lying, I can spend 1 Moxie point to gain advantage on that roll.",
			}
		},
		"subclassfeature6" : {
			name : "Scrap Like a Sleuth",
			source : ["BH:AFC", 3],
			minlevel : 6,
			description : "\n   " + "I know special moves and can use them by spending moxie.",
			extraname : "Scrap Like a Sleuth",
			eval : "ClassFeatureOptions(['pugilist', 'subclassfeature6', 'in their head', 'extra']); ClassFeatureOptions(['pugilist', 'subclassfeature6', 'read and react', 'extra']); ClassFeatureOptions(['pugilist', 'subclassfeature6', \"size 'em up\", 'extra']);",
			removeeval : "ClassFeatureOptions(['pugilist', 'subclassfeature6', 'in their head', 'extra'], 'remove'); ClassFeatureOptions(['pugilist', 'subclassfeature6', 'read and react', 'extra'], 'remove'); ClassFeatureOptions(['pugilist', 'subclassfeature6', \"size 'em up\", 'extra'], 'remove');",
			"in their head." : {
				name : "In Their Head",
				source : ["BH:AFC", 3],
				description : " [1 moxie point]" + "\n   " + "Creature makes a Wisdom saving throw contested by my Intelligence (Investigation) check. If I succeed, I have advantage on all weapon attacks against that creature until the start of my next turn",
				action : ["bonus action", ""]
			},
			"read and react" : {
				name : "Read and React",
				source : ["BH:AFC", 3],
				description : " [1 moxie point]" + "\n   " + " The creature makes an Intelligence saving throw contested by my Wisdom (Insight) check. If I succeed the attack misses me.",
				action : ["reaction", "(hit by attack)"]
			},
			"size 'em up" : {
				name : "Size 'Em Up",
				source : ["BH:AFC", 3],
				description : " [1 moxie  point]" + "\n   " + "Creature makes a Charisma saving throw contested by my Wisdom (Perception) check. If I succeed, I can ask the DM three questions that can be answered with a yes or a no regarding the creature's mannerisms, personality, or statistics.",
				action : ["bonus action", ""]
			}
		},
		"subclassfeature11" : {
			name : "Heart of the City",
			source : ["BH:AFC", 3],
			minlevel : 11,
			description : "\n   " + "when I take a long rest in a settlement, I can attune to the settlement as if it were a magical item. Until the attunement ends, I gain the benefits listed on page 3 while in that settlement.",
			extraname : "Heart of the City",
			"heart of the city" : {
				name : "Heart of the City",
				source : ["BH:AFC", 3],
				description : "\n   " + "While attuned to a settlement I gain the following benefits:" + "\n    - " + "I cannot be surprised and I add your proficiency bonus to my initiative" + "\n    - " + "I have darkvision to a range of 120 feet" + "\n    - " + "When I make an ability check using the Insight, Investigation, or Perception skills and I am proficient in that skill, I add double my proficiency modifier to the ability check" + "\n    - " + "I cannot be lost by any means, and my travel speed is doubled while not in combat."
			},
			eval : "ClassFeatureOptions(['pugilist', 'heart of the city', 'extra']);",
			removeeval : "ClassFeatureOptions(['pugilist', 'heart of the city', 'extra'], 'remove');"
		},
		"subclassfeature17" : {
			name : "Eyes Wide Open",
			source : ["BH:AFC", 3],
			minlevel : 17,
			description : "\n   " + "As a bonus action, I can spend 3 moxie points. For the next minute, I can use all of the moxie features granted to me by my Detective Work and Scrap Like a Sleuth features without spending moxie."
		}
	}
};

ClassSubList["club of the salt and vinegar"] = {
	regExpSearch : /^(((?=.*pugilist)(?=.*salt)(?=.*vinegar))|(?=.*brawler)).*$/i,
	subname : "Club of the Salt and Vinegar",
	fullname : "Pugilist (Salt and Vinegar)",
	source : ["BH:AFC", 4],
	abilitySave : 5,
	features : {
		"subclassfeature3" : {
			name : "Saly Salute",
			source : ["BH:AFC", 4],
			minlevel : 3,
			description : "\n   " + "I gain proficiency with the Intimidation skill." + "\n   " + "I have mastered the art of the enraging insult. I can spend 1 moxie point and use a bonus action to provoke a creature who can see or hear me within 60 feet. That creature has disadvantage on any attack rolls it makes that do not include me as a target before the start of my next turn. That creature must also succeed on a Wisdom saving throw or take my fisticuffs damage die + my proficiency modifier in psychic damage.",
			skillstxt : "\n\n" + toUni("Pugilist (Salt and Vinegar)") + ": Intimidation",
			action : ["bonus action", ""]
		},
		"subclassfeature6" : {
			name : "Piss and Vinegar",
			source : ["BH:AFC", 4],
			minlevel : 6,
			description : "\n   " + "I know special moves and can use them by spending moxie.",
			extraname : "Piss and Vinegar",
			eval : "ClassFeatureOptions(['pugilist', 'subclassfeature6', 'blindsider', 'extra']); ClassFeatureOptions(['pugilist', 'subclassfeature6', 'heelstomper', 'extra']); ClassFeatureOptions(['pugilist', 'subclassfeature6', 'low blow', 'extra']);",
			removeeval : "ClassFeatureOptions(['pugilist', 'subclassfeature6', 'blindsider', 'extra'], 'remove'); ClassFeatureOptions(['pugilist', 'subclassfeature6', 'heelstomper', 'extra'], 'remove'); ClassFeatureOptions(['pugilist', 'subclassfeature6', 'low blow', 'extra'], 'remove');",
			"blindsider" : {
				name : "Blindsider",
				source : ["BH:AFC", 4],
				description : " [1 moxie point]" + "\n   " + "The creature must succeed on a Constitution saving throw or be blinded until the end of my next turn"
			},
			"heelstomper" : {
				name : "Heelstomper",
				source : ["BH:AFC", 4],
				description : " [1 moxie point]" + "\n   " + "The creature must succeed on a Dexterity saving throw or halve its movement speed for one minute"
			},
			"low blow" : {
				name : "Low Blow.",
				source : ["BH:AFC", 4],
				description : " [1 moxie  point]" + "\n   " + "The creature must succeed on a Strength saving throw or be knocked prone"
			}
		},
		"subclassfeature11" : {
			name : "Mean Old Cuss",
			source : ["BH:AFC", 4],
			minlevel : 11,
			description : "\n   " + "I do not need to spend a moxie point to use the Salty Salute feature" + "\n   " + "In addition, the saving throw DC of my Salt & Vinegar features increases by 2"
		},
		"subclassfeature17" : {
			name : "The Uncouth Art",
			source : ["BH:AFC", 4],
			minlevel : 17,
			description : "\n   " + "As a bonus action, I can spend 3 moxie points and swear at one creature who shares a language with me within 60 feet. That creature must pass a Wisdom saving throw or become enraged for one minute. Creatures who are immune to charm and fear effects cannot be enraged. While enraged the creature cannot make attacks against creatures other than me and my damage is doubled against that creature."
		}
	}
};

SourceList["BH:PC"] = {
	name : "Benjamin Huffman: the Pugilist Class",
	abbreviation : "BH:PC",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/184921/"
};

SourceList["BH:AFC"] = {
	name : "Benjamin Huffman: Additional Fight Clubs for the Pugilist Class",
	abbreviation : "BH:AFC",
	group : "Dungeon Masters Guild",
	url : "https://www.dmsguild.com/product/186640/"
};
