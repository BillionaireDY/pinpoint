import { Injectable } from '@angular/core';

import * as themeMap from 'app/core/constants/theme';

export const enum Theme {
    Light = 'light',
    Dark = 'dark',
}

@Injectable()
export class ThemeService {
    currentTheme: Theme = Theme.Light;
    constructor() {}
    private setTheme(theme: Theme): void {
        this.currentTheme = theme;
        Object.entries(themeMap[theme]).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });
    }

    changeTheme(theme: Theme): void {
        this.setTheme(theme);
    }

    getThemeColor(): any {
        return this.currentTheme; 
    }
}
