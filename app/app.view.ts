namespace $.$$ {
	export class $bog_birthdaycase_app extends $.$bog_birthdaycase_app {
		override year_max() {
			return new Date().getFullYear()
		}
		birth_date() {
			const date = new Date( this.year(), this.month() - 1, this.day() )
			date.setHours( 0, 0, 0, 0 )
			return date
		}
		override date_valid() {
			if( !Number.isInteger( this.day() ) || this.day() < 1 || this.day() > 31 ) return false
			if( !Number.isInteger( this.month() ) || this.month() < 1 || this.month() > 12 ) return false
			if( !Number.isInteger( this.year() ) || this.year() < 1 || this.year() > this.year_max() ) return false
			const date = this.birth_date()
			if( date.getFullYear() !== this.year() ) return false
			if( date.getMonth() !== this.month() - 1 ) return false
			if( date.getDate() !== this.day() ) return false
			const today = new Date()
			today.setHours( 0, 0, 0, 0 )
			return date <= today
		}
		weekday_name( date = this.birth_date() ) {
			return [
				'воскресенье',
				'понедельник',
				'вторник',
				'среда',
				'четверг',
				'пятница',
				'суббота',
			][ date.getDay() ]
		}
		is_leap_year( year = this.year() ) {
			return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0
		}
		age_for( birth: Date, now: Date ) {
			let age = now.getFullYear() - birth.getFullYear()
			const birthday_passed = now.getMonth() > birth.getMonth()
				|| now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate()
			if( !birthday_passed ) --age
			return age
		}
		age() {
			return this.age_for( this.birth_date(), new Date() )
		}
		age_word() {
			const age = this.age()
			const last_two = age % 100
			const last = age % 10
			if( last_two >= 11 && last_two <= 14 ) return 'лет'
			if( last === 1 ) return 'год'
			if( last >= 2 && last <= 4 ) return 'года'
			return 'лет'
		}
		date_text() {
			const day = String( this.day() ).padStart( 2, '0' )
			const month = String( this.month() ).padStart( 2, '0' )
			const year = String( this.year() ).padStart( 4, '0' )
			return `${ day } ${ month } ${ year }`
		}
		override weekday_text() {
			if( !this.date_valid() ) return 'День недели: —'
			return `День недели: ${ this.weekday_name() }`
		}
		override leap_text() {
			if( !this.date_valid() ) return 'Високосный год: —'
			return `Високосный год: ${ this.is_leap_year() ? 'да' : 'нет' }`
		}
		override age_text() {
			if( !this.date_valid() ) return 'Возраст: —'
			return `Возраст: ${ this.age() } ${ this.age_word() }`
		}
		digit_rows( digit: string ) {
			const rows: Record< string, string[] > = {
				'0': [ '***', '* *', '* *', '* *', '***' ],
				'1': [ ' **', '  *', '  *', '  *', '***' ],
				'2': [ '***', '  *', '***', '*  ', '***' ],
				'3': [ '***', '  *', '***', '  *', '***' ],
				'4': [ '* *', '* *', '***', '  *', '  *' ],
				'5': [ '***', '*  ', '***', '  *', '***' ],
				'6': [ '***', '*  ', '***', '* *', '***' ],
				'7': [ '***', '  *', '  *', '  *', '  *' ],
				'8': [ '***', '* *', '***', '* *', '***' ],
				'9': [ '***', '* *', '***', '  *', '***' ],
			}
			return rows[ digit ] ?? [ '   ', '   ', '   ', '   ', '   ' ]
		}
		override star_art() {
			if( !this.date_valid() ) return 'Введите корректную дату'
			const groups = this.date_text().split( ' ' )
			return Array.from({ length: 5 }, ( _, row ) => groups
				.map( group => [ ...group ].map( digit => this.digit_rows( digit )[ row ] ).join( ' ' ) )
				.join( '   ' )
			).join( '\n' )
		}
		@$mol_action
		override show_result( next?: Event ) {
			if( next === undefined || !this.date_valid() ) return null
			console.log( `Дата рождения: ${ this.date_text() }` )
			console.log( this.weekday_text() )
			console.log( this.leap_text() )
			console.log( this.age_text() )
			console.log( this.star_art() )
			return null
		}
	}
}
