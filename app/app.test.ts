namespace $ {
	$mol_test({
		'show all birthday results'( $ ) {
			const app = $bog_birthdaycase_app.make({ $ })
			app.day( 1 )
			app.month( 2 )
			app.year( 2003 )
			$mol_assert_ok( app.Show_button().enabled() )
			$mol_assert_ok( app.Weekday_info().text().includes( 'суббота' ) )
			$mol_assert_ok( app.Leap_info().text().includes( 'нет' ) )
			$mol_assert_ok( app.Age_info().text().includes( '23 года' ) )
			$mol_assert_equal( app.Star_display().value().split( '\n' ).length, 5 )
			app.Show_button().click( new Event( 'click' ) )
		},
		'validate leap day'( $ ) {
			const app = $bog_birthdaycase_app.make({ $ })
			app.day( 29 )
			app.month( 2 )
			app.year( 1900 )
			$mol_assert_not( app.date_valid() )
			app.year( 2000 )
			$mol_assert_ok( app.date_valid() )
			$mol_assert_ok( app.Leap_info().text().includes( 'да' ) )
		},
		'invalid date keeps outputs visible'( $ ) {
			const app = $bog_birthdaycase_app.make({ $ })
			$mol_assert_not( app.Show_button().enabled() )
			$mol_assert_equal( app.Weekday_info().text(), 'День недели: —' )
			$mol_assert_equal( app.Leap_info().text(), 'Високосный год: —' )
			$mol_assert_equal( app.Age_info().text(), 'Возраст: —' )
			$mol_assert_equal( app.Star_display().value(), 'Введите корректную дату' )
		},
	})
}
