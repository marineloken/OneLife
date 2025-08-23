import { Day, Routine, RoutineGroup, RoutineStep } from '$lib/models/Routine.js';

/** @type {Day[]} */
export const routines = [
	new Day('Mon', [
		new RoutineGroup('Morning Workout', [
			new Routine('Glute Hypertrophy & Shape (Upper Glute Bias)', '', '', [
				new RoutineStep('Cable Kickbacks – 4x15-20'),
				new RoutineStep('Barbell Hip Thrust (Heavy) – 4x10'),
				new RoutineStep('Dumbbell Bulgarian Split Squats (slight forward lean) – 3x10-12'),
				new RoutineStep('Seated Abduction Machine – 3x25'),
				new RoutineStep('Step-ups to High Box (controlled) – 3x10 each side'),
				new RoutineStep('Incline Walk (steep incline, low speed) – 15 min as finisher')
			])
		]),
		new RoutineGroup('Post-Workout Routine', [
			new Routine('Skincare', '', '', [new RoutineStep('Snail Mucus')]),
			new Routine('Haircare', '', '', [new RoutineStep('Brush'), new RoutineStep('Oil')])
		])
	]),
	new Day('Tue', [
		new RoutineGroup('Morning Workout', [
			new Routine('Light Conditioning + Core', '', '', [
				new RoutineStep('Easy 5-8K outdoor run (aesthetic maintenance-friendly cardio)'),
				new RoutineStep('Core (planks, side planks, cable crunches) – 10-15 min')
			])
		])
	]),
	new Day('Wed', [
		new RoutineGroup('Morning Workout', [
			new Routine('Lower Body Strength (Squat + Posterior Chain)', '', '', [
				new RoutineStep('Back Squat – 4x6 (75-85% 1RM)'),
				new RoutineStep('Romanian Deadlift – 4x8'),
				new RoutineStep('Leg Press (high & wide stance) – 3x10'),
				new RoutineStep('Reverse Hyper or Glute Kickback Machine – 3x15'),
				new RoutineStep('Walking Lunges – 2x20 steps'),
				new RoutineStep('Optional: Short sprint intervals (e.g., 5x200m)')
			])
		])
	]),
	new Day('Thu', [
		new RoutineGroup('Morning Workout', [
			new Routine('Glute Isolation & Volume (Pump Day)', '', '', [
				new RoutineStep('Banded Lateral Walks – 3x20'),
				new RoutineStep('Single-Leg Hip Thrusts – 3x12'),
				new RoutineStep('Cable Glute Pull-Throughs – 4x15'),
				new RoutineStep('Lying Hamstring Curl (drop set on last set) – 3x12'),
				new RoutineStep('Standing Abduction with Cable or Band – 3x20 each side'),
				new RoutineStep('Frog Pumps or Feet-Together Glute Bridges – 2x30 (burnout set)')
			])
		])
	]),
	new Day('Fri', [
		new RoutineGroup('Morning Workout', [
			new Routine('Optional Run (or Rest)', '', '', [
				new RoutineStep('A longer steady-state run (8-12K) or trail run'),
				new RoutineStep('Alternatively, rest or active recovery (yoga, mobility, walking)')
			])
		])
	]),
	new Day('Sat', [
		new RoutineGroup('Any Time', [
			new Routine('Hair Wash', '', '', [
				new RoutineStep('Pre-Wash - Nanoil Jojoba Oil', '', '', '', [
					'Apply Nanoil Jojoba Oil to scalp and ends 1–2 hours before washing.',
					'Gently detangle with fingers.',
					'Optional: Do a quick scalp massage using your rubber scalp brush.'
				]),
				new RoutineStep(
					'Rinse + Bonding Treatment (Once a Month) - Olaplex No. 3 Hair Perfector',
					'',
					'',
					'',
					[
						'Lightly dampen hair.',
						'Apply Olaplex No. 3 Hair Perfector to mid-lengths and ends.',
						'Leave on for 10–30 minutes.',
						'Rinse thoroughly before shampooing.'
					]
				),
				new RoutineStep('Shampoo - Davines Momo Shampoo', '', '', '', [
					'Use Davines Momo Shampoo to cleanse scalp and lengths.',
					'Massage gently — use your scalp brush if desired.',
					'Rinse well.'
				]),
				new RoutineStep(
					'Deep Condition - Briogeo Don’t Despair, Repair! Deep Conditioning Mask',
					'',
					'',
					'',
					[
						'Apply Briogeo Don’t Despair, Repair! Deep Conditioning Mask mid-lengths to ends.',
						'Leave on for 10–15 minutes.',
						'Detangle with wide-tooth comb or fingers.',
						'Rinse with cool to lukewarm water.'
					]
				),
				new RoutineStep('Towel Dry - Car', '', '', '', [
					'Gently squeeze out excess water with a microfiber towel or cotton T-shirt.',
					'Do not rub — just blot and squeeze.'
				]),
				new RoutineStep(
					'Leave-In - Davines OI All In One Milk',
					'Apply Davines OI All In One Milk to damp hair, focusing on lengths and ends.',
					'',
					'',
					[]
				),
				new RoutineStep('Heat Protectant - L’Oréal Vitamino Color 10-in-1 Spray'),
				new RoutineStep('Dry + Style', '', '', '', [
					'20% Dyson blow-dry, then 80% air dry.',
					'Finish drying with cool air and soft brush straightening if desired.',
					"Optional: Single-pass flat iron, if you're smoothing."
				]),
				new RoutineStep(
					'Finishing Oil - Davines OI Oil',
					'Apply Davines OI Oil to ends using the “prayer hands” method (smooth between palms).',
					'',
					'',
					[]
				)
			])
		])
	])
];
