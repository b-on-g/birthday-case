namespace $ {
	$mol_test({

		'walk through birthday form'( $ ) {
			const app = $bog_birthdaycase_app.make({ $ })

			app.day( 1 )
			app.day_next()
			$mol_assert_equal( app.step(), 2 )

			app.month( 2 )
			app.month_next()
			$mol_assert_equal( app.step(), 3 )

			app.year( 2003 )
			app.year_next()
			$mol_assert_equal( app.step(), 4 )
			$mol_assert_equal( app.weekday_name(), 'суббота' )
			$mol_assert_equal( app.content()[ 0 ], app.Result_step() )
		},

		'detect leap years'( $ ) {
			const app = $bog_birthdaycase_app.make({ $ })
			$mol_assert_ok( app.is_leap_year( 2000 ) )
			$mol_assert_not( app.is_leap_year( 1900 ) )
			$mol_assert_ok( app.is_leap_year( 2024 ) )
		},

		'calculate completed age'( $ ) {
			const app = $bog_birthdaycase_app.make({ $ })
			$mol_assert_equal(
				app.age_for( new Date( 2000, 9, 10 ), new Date( 2026, 9, 5 ) ),
				25,
			)
			$mol_assert_equal(
				app.age_for( new Date( 2000, 9, 10 ), new Date( 2026, 9, 10 ) ),
				26,
			)
		},

		'draw date with stars'( $ ) {
			const app = $bog_birthdaycase_app.make({ $ })
			app.day( 1 )
			app.month( 2 )
			app.year( 2003 )
			const art = app.star_art()
			$mol_assert_equal( art.split( '\n' ).length, 5 )
			$mol_assert_ok( art.includes( '*' ) )
		},

	})
}
