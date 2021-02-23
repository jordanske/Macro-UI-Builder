import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterItemComponentInterface, GridType } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';

import IconCollectionImported from '../../assets/icons.json';
const IconCollection: any = IconCollectionImported;

const maxHotbars = 10;
const gridMultiplier = 4;

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
        gridType: GridType.Fit,
        draggable: {
            enabled: true
        },
        pushItems: false,
        resizable: {
            enabled: false
        },
        swap: false,
        swapWhileDragging: false,
        allowMultiLayer: true,
        maxLayerIndex: 10,
        // displayGrid: 'always',
        minCols: 32 * gridMultiplier,
        maxCols: 32 * gridMultiplier,
        minRows: 18 * gridMultiplier,
        maxRows: 18 * gridMultiplier,
        margin: -1, // 4
        // margin: 0,
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

        const iconIDs = Object.keys(IconCollection.icons);

        // Default hotbars
        for (let index = 0; index < maxHotbars; index++) {
            this.hotbars.push(new HotbarItem(
                index + 1,
                index > 4 ? (12 * gridMultiplier) + gridMultiplier : 0,
                (index % 5) * (gridMultiplier + 1),
                HotbarLayout.L12x1,
                true,
                iconIDs[Math.floor((iconIDs.length + 1) * Math.random())]
            ));
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
                cols: [12, 6, 4, 3, 2, 1][hotbar.layout] * gridMultiplier,
                rows: [1, 2, 3, 4, 6, 12][hotbar.layout] * gridMultiplier,
                layerIndex: index
            });
        });
    }


}

class HotbarItem {
    public number: number;
    public positionX: number;
    public positionY: number;
    public layout: HotbarLayout;
    public visible: boolean;
    public icon_id: string;

    constructor(
        number: number,
        positionX: number,
        positionY: number,
        layout: HotbarLayout,
        visible: boolean,
        icon_id: string,
    ) {
        this.number = number;
        this.positionX = positionX;
        this.positionY = positionY;
        this.layout = layout;
        this.visible = visible;
        this.icon_id = icon_id;
    }

    get icon_path(): string
    {
        if (this.icon_id) {
            return IconCollection.icons[this.icon_id].file;
        }

        return '';
    }
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