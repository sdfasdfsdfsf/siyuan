import {confirmDialog} from "../dialog/confirmDialog";
import {Plugin} from "./index";
import {showMessage} from "../dialog/message";
import {Dialog} from "../dialog";
import {MenuItem} from "../menus/Menu";
import {Menu as SiyuanMenu} from "../menus/Menu";

export class Menu {
    private menu: SiyuanMenu;
    private isOpen: boolean

    constructor(id?: string, closeCB?: () => void) {
        this.menu = window.siyuan.menus.menu;
        this.isOpen = false;
        if (id) {
            const dataName = this.menu.element.getAttribute('data-name');
            if (dataName && dataName === id) {
                this.isOpen = true
            }
        }
        this.menu.remove();
        if (!this.isOpen) {
            this.menu.element.setAttribute('data-name', id);
            this.menu.removeCB = closeCB;
        }
    }

    showSubMenu(subMenuElement: HTMLElement) {
        this.menu.showSubMenu(subMenuElement);
    }

    addItem(option: IMenu) {
        if (this.isOpen) {
            return;
        }
        const menuItem = new MenuItem(option);
        this.menu.append(menuItem.element);
        return menuItem.element;
    }

    addSeparator() {
        if (this.isOpen) {
            return;
        }
        this.addItem({type: 'separator'});
    }

    open(options: { x: number, y: number, h?: number, w?: number, isLeft: false }) {
        if (this.isOpen) {
            return;
        }
        this.menu.popup(options, options.isLeft);
    }

    fullscreen(position: { x: number; y: number }) {
        if (this.isOpen) {
            return;
        }
        this.menu.popup({x: position.x, y: position.y});
    }

    close() {
        this.menu.remove();
    }
}

export const API = {
    Plugin: Plugin,
    confirm: confirmDialog,
    showMessage,
    Dialog,
    Menu,
};
