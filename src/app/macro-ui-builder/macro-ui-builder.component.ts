import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';

const maxHotbars = 10;

@Component({
    selector: 'app-macro-ui-builder',
    templateUrl: './macro-ui-builder.component.html',
    styleUrls: ['./macro-ui-builder.component.scss']
})
export class MacroUiBuilderComponent implements OnInit {

    layoutMode = true;

    hotbarIconIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    hotbarLayouts: { label: string, value: number }[] = [];

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
        minCols: 32,
        maxCols: 32,
        minRows: 18,
        maxRows: 18,
        margin: -1, // 4
        itemChangeCallback: this.onItemChange.bind(this)
    };

    hotbars: HotbarItem[] = [];

    layout: GridsterHotbarItem[] = [];

    ngOnInit(): void {
        
        for (let item in HotbarLayout) {
            if (isNaN(Number(item))) {
                this.hotbarLayouts.push({
                    label: item,
                    value: parseInt(HotbarLayout[item]),
                });
            }
        }

        for (let index = 0; index < maxHotbars; index++) {
            this.hotbars.push({
                number: index + 1,
                positionX: 0,
                positionY: 0,
                layout: HotbarLayout.L12x1,
                visible: true,
                // layout: Math.floor((5 - 0 + 1) * Math.random()) + 0
            });
        }
        this.refreshLayout();
    }

    addItem(): void {
        // 
    }

    deleteItem(id: string): void {
        /* const item = this.layout.find(d => d.id === id);
        if (!item) {
            return;
        }
        this.layout.splice(this.layout.indexOf(item), 1); */
    }

    onHotbarLayourChange() {
        this.refreshLayout();
    }

    onItemChange(item: GridsterHotbarItem, itemComponent: GridsterItemComponentInterface): void {
        if (item.hotbarIndex === undefined) {
            console.warn('Index not set', item);
            return;
        }

        this.hotbars[item.hotbarIndex].positionX = item.x;
        this.hotbars[item.hotbarIndex].positionY = item.y;
    }

    refreshLayout() {
        this.layout = [];
        this.hotbars.forEach((hotbar, index) => {
            if (!hotbar.visible) {
                return;
            }

            this.layout.push({
                hotbarIndex: index,
                hotbarItem: hotbar,
                layout: ['L12x1', 'L6x2', 'L4x3', 'L3x4', 'L2x6', 'L1x12'][hotbar.layout],
                x: hotbar.positionX,
                y: hotbar.positionY,
                id: UUID.UUID(),
                cols: [12, 6, 4, 3, 2, 1][hotbar.layout],
                rows: [1, 2, 3, 4, 6, 12][hotbar.layout],
            });
        });
    }

    public JSON;
    public constructor() {
        this.JSON = JSON;
      }
}

interface HotbarItem {
    number: number;
    positionX: number;
    positionY: number;
    layout: HotbarLayout;
    visible: boolean;
}

interface GridsterHotbarItem extends GridsterItem {
    hotbarIndex?: number;
    hotbarItem?: HotbarItem;
    layout?: string;
}

enum HotbarLayout {
    L12x1 = 0,
    L6x2  = 1,
    L4x3  = 2,
    L3x4  = 3,
    L2x6  = 4,
    L1x12 = 5,
}