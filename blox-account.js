import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `blox-account`
 * Creates an account on the EOS blockchain
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BloxAccount extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
    `;
  }
  static get properties() {
    return {
      eos: {
        type: Object,
      },
      creator: {
        type: String,
      },
      name: {
        type: String,
      },
      owner: {
        type: String,
      },
      active: {
        type: String,
      }
    };
  }

  _makeAccount(){
    if(this.eos && this.owner && this.active && this.creator && this.name){
      this.makeAccount(this.eos, this.creator, this.name, this.owner, this.active)
    }
  }

// CREATOR the acocunt name of the creator 12 charectors
// NAME is the new account name yoiu want to register 12 charectors
// OWNER is the public key for the owner account
// ACTIVE is the public key for the active account

  makeAccount(eos, creator, name, owner, active, bytesIn, stakeNetQuantityIn, stakeCpuQuantityIn, transferIn) {
    return new Promise((resolve, reject) => {
      const bytes = bytesIn || 7000;
      const stake_net_quantity = stakeNetQuantityIn + ' EOS' ||'0.1000 EOS';
      const stake_cpu_quantity = stakeCpuQuantityIn + ' EOS' || '0.2000 EOS';
      const transfer = transferIn || 0;
      eos.transaction(tr => {
        tr.newaccount(creator, name, owner, active)
        tr.buyrambytes(creator, name, bytes)
        tr.delegatebw(creator, name, stake_net_quantity, stake_cpu_quantity, transfer)
      })
      .then((response) => {
        resolve(response.transaction_id)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

} window.customElements.define('blox-account', BloxAccount);
