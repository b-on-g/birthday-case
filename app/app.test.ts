namespace $ {
	$mol_test({

		'walk through birthday form with buttons'( $ ) {
			const app = $bog_birthdaycase_app.make({ $ })
			app.day( 1 )
			app.Day_button().click( new Event( 'click' ) )
			$mol_assert_equal( app.step(), 2 )
			app.month( 2 )
			app.Month_button().click( new Event( 'click' ) )
			$mol_assert_equal( app.step(), 3 )
			app.year( 2003 )
			app.Year_button().click( new Event( 'click' ) )
			$mol_assert_equal( app.step(), 4 )
			$mol_assert_ok( app.result_text().includes( 'суббота' ) )
			$mol_assert_equal( app.content()[ 0 ], app.Result_info() )
		},

		'validate leap day'( $ ) {
			const app = $bog_birthdaycase_app.make({ $ })
			app.day( 29 )
			app.month( 2 )
			app.year( 1900 )
			$mol_assert_not( app.date_valid() )
			app.year( 2000 )
			$mol_assert_ok( app.date_valid() )
			$mol_assert_ok( app.leap_text().includes( 'високосный' ) )
		},

		'calculate current age'( $ ) {
			const app = $bog_birthdaycase_app.make({ $ })
			app.day( 1 )
			app.month( 1 )
			app.year( 2000 )
			$mol_assert_ok( app.age_text().includes( '26 лет' ) )
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
