export class Day {
	day = 'Mon';

	/** @type {RoutineGroup[]} */
	groups = [];

	constructor(day, groups) {
		this.day = day;
		this.groups = groups;
	}
}

export class RoutineGroup {
	title = '';

	/** @type {Routine[]} */
	routines = [];

	constructor(title, routines) {
		this.title = title;
		this.routines = routines;
	}
}

export class Routine {
	name = '';
	happiness = '';
	effectiveness = '';

	/** @type {RoutineStep[]} */
	steps = [];

	constructor(name, happiness, effectiveness, steps) {
		this.name = name;
		this.happiness = happiness;
		this.effectiveness = effectiveness;
		this.steps = steps;
	}
}

export class RoutineStep {
	name = '';
	note = '';
	happiness = '';
	effectiveness = '';

	/** @type {string[]} */
	steps = [];

	constructor(name, note, happiness, effectiveness, steps) {
		this.name = name;
		this.note = note;
		this.happiness = happiness;
		this.effectiveness = effectiveness;
		this.steps = steps;
	}
}
