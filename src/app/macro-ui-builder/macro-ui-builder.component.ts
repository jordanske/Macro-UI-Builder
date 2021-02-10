import { Component } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';

@Component({
    selector: 'app-macro-ui-builder',
    templateUrl: './macro-ui-builder.component.html',
    styleUrls: ['./macro-ui-builder.component.scss']
})
export class MacroUiBuilderComponent {

    layoutMode = true;

    options: GridsterConfig = {
        draggable: {
            enabled: true
        },
        pushItems: false,
        resizable: {
            enabled: false
        },
        allowMultiLayer: true,
        maxLayerIndex: 5,
        // displayGrid: 'always',
        minCols: 20,
        maxCols: 20,
        minRows: 20,
        maxRows: 20,
    };

    hotbars: HotbarItem[] = [];

    layout: GridsterItem[] = [];

    addItem(): void {
        this.hotbars.push({
            positionX: 0,
            positionY: 0,
            layout: Math.floor((5 - 0 + 1) * Math.random()) + 0
        });
        this.refreshLayout();
    }

    deleteItem(id: string): void {
        /* const item = this.layout.find(d => d.id === id);
        if (!item) {
            return;
        }
        this.layout.splice(this.layout.indexOf(item), 1); */
    }

    refreshLayout() {
        this.layout = [];
        this.hotbars.forEach(hotbar => {
            this.layout.push({
                x: hotbar.positionX,
                y: hotbar.positionY,
                id: UUID.UUID(),
                cols: [12, 6, 4, 3, 2, 1][hotbar.layout],
                rows: [1, 2, 3, 4, 6, 12][hotbar.layout],
            });
        });
    }
}

interface HotbarItem {
    positionX: number;
    positionY: number;
    layout: HotbarLayout;
}

enum HotbarLayout {
    L12x1,
    L6x2,
    L4x3,
    L3x4,
    L2x6,
    L1x12,
}