import { NgModule } from '@angular/core';

import { LocalizedResourcePipe } from './localizedRresource.pipe';
import { HighlightSearchPipe } from './highlightsearch.pipe';
import { SafePipe } from './safe.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LocalizedResourcePipe,
        HighlightSearchPipe,
        SafePipe
    ],
    imports: [
        CommonModule
    ],
    providers: [],
    exports: [
        LocalizedResourcePipe,
        HighlightSearchPipe,
        SafePipe
    ]
})
export class PipesModule { }