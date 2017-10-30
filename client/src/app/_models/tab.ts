import { Component } from '@angular/core';
export class Tab {

    private _active: boolean = false;
    constructor(private _id: Number = -1, public title?: String,
        public link?: String, public content?: any) {
    }

    set active(active: boolean) {
        this._active = active;
    }

    get active() {
        return this._active;
    }

    get id() {
        return this._id;
    }
    set id(id: Number) {
        this._id = id;
    }
    set component(component: Component) {
        this.content = component;
    }
}