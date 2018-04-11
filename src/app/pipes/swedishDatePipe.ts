import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'swedishDatePipe' })

export class SwedishDatePipe implements PipeTransform {

    transform(value: Date): string {
        const dayName = this.giveDayName(value.getDay());
        const monthName = this.giveMonthName(value.getMonth());
        const date = value.getDate();
        const year = value.getFullYear();
        return dayName + ', ' + date + ' ' + monthName + ' ' + year;

    }

    giveDayName(dayNumber: number) {
        switch (dayNumber) {
            case 0: return 'Söndag';
            case 1: return 'Måndag';
            case 2: return 'Tisdag';
            case 3: return 'Onsdag';
            case 4: return 'Torsdag';
            case 5: return 'Fredag';
            case 6: return 'Lördag';
        }
    }

    giveMonthName(monthNumber) {
        switch (monthNumber) {
            case 0: return 'januari';
            case 1: return 'februari';
            case 2: return 'mars';
            case 3: return 'april';
            case 4: return 'maj';
            case 5: return 'juni';
            case 6: return 'juli';
            case 7: return 'augusti';
            case 8: return 'september';
            case 9: return 'oktober';
            case 10: return 'november';
            case 11: return 'december';

        }
    }
}