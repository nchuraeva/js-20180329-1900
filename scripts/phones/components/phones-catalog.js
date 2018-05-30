'use strict';
import MainComponent from "../../main-component.js";

export default class PhonesCatalogue extends MainComponent {
    constructor({element}) {
        super(element)

        this._phones = [];
        this._element = element;

        this._onPhoneClick = this._onPhoneClick.bind(this);

        this._render();

        this._element.addEventListener('click', this._onPhoneClick);
        this._element.addEventListener('click', this._onDetailsTriggerClick.bind(this));
        this._element.addEventListener('click', this._onAddButtonClick.bind(this));
    }

    setPhones(phones) {
        this._phones = phones;
        this._render();
    }
    _onDetailsTriggerClick(event) {
        let trigger = event.target.closest('[data-element="details-trigger"]');

        if (!trigger) {
            return;
        }

        let phoneElement = event.target.closest('[data-element="phone"]');

        this._trigger('phoneSelected', phoneElement.dataset.phoneId);
    }

    _onAddButtonClick(event) {
        let addButton = event.target.closest('[data-element="add-button"]');

        if (!addButton) {
            return;
        }

        let phoneElement = event.target.closest('[data-element="phone"]');

        this._trigger('add', phoneElement.dataset.phoneId);
    }

    _onPhoneClick(event) {
        let phoneElement = event.target.closest('[data-element="phone"]');

        if (!phoneElement) {
            return;
        }

        let customEvent = new CustomEvent('phoneSelected', {
            detail: phoneElement.dataset.phoneId
        });

        this._element.dispatchEvent(customEvent);
    }

    _search(event) {
        let query = event.detail;

        [].forEach.call(this._element.querySelectorAll('.thumbnail'), function (element) {
           element.classList.toggle("hidden",false);
        });

        this._phones.forEach((phone) => {
            let element = this._element.querySelector(`[data-phone-id="${phone.id}"]`);
            element.classList.toggle("hidden", !phone.id.includes(query));
        });

    }

    _render() {
        this._element.innerHTML = `
      <ul class="phones">
      
        ${
            this._phones
                .map((phone) => `
              <li class="thumbnail"
                  data-element="phone"
                  data-phone-id="${ phone.id }">
                  
                <a href="#!/phones/${ phone.id }"
                   class="thumb">
                  <img alt="${ phone.name }"
                       src="${ phone.imageUrl }">
                </a>
                
                <a href="#!/phones/${ phone.id }"
                  data-element="details-trigger">
                  ${ phone.name }
                </a>
                
                <p>${ phone.snippet }</p>
              </li> 
            `)
                .join('')
            }
             
      </ul>    
    `;
    }
}