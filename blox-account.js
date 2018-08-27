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

  _accountNameExists(accountName){
    return new Promise((resolve, reject) => {
      if(this.eos && accountName){
        eos.getAccount(accountName)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        })
      } else {
        reject('Missing Arguments');
      }
    })
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
      //stakeNetQuantityIn += (netCountDecimal[1].length === 0 ? "." : "") + "0".repeat(4 - netCountDecimal[1].length)
      var netCountDecimal = stakeNetQuantityIn.split(".");
      if(netCountDecimal[1].length === 0){
        stakeNetQuantityIn = stakeNetQuantityIn+'.0000'
      } else if (netCountDecimal[1].length === 1){
        stakeNetQuantityIn = stakeNetQuantityIn+'000'
      } else if (netCountDecimal[1].length === 2){
        stakeNetQuantityIn = stakeNetQuantityIn+'00'
      } else if (netCountDecimal[1].length === 3){
        stakeNetQuantityIn = stakeNetQuantityIn+'0'
      }
      var cpuCountDecimal = stakeCpuQuantityIn.split(".");
      if(cpuCountDecimal[1].length === 0){
        stakeCpuQuantityIn = stakeCpuQuantityIn+'.0000'
      } else if (cpuCountDecimal[1].length === 1){
        stakeCpuQuantityIn = stakeCpuQuantityIn+'000'
      } else if (cpuCountDecimal[1].length === 2){
        stakeCpuQuantityIn = stakeCpuQuantityIn+'00'
      } else if (cpuCountDecimal[1].length === 3){
        stakeCpuQuantityIn = stakeCpuQuantityIn+'0'
      }

      const bytes = parseInt(bytesIn) || 7000;
      const stake_net_quantity = stakeNetQuantityIn +' EOS' ||'0.1000 EOS';
      const stake_cpu_quantity = stakeCpuQuantityIn +' EOS' || '0.2000 EOS';
      const transfer = parseInt(transferIn) || 0;
      console.log(creator)
      console.log(name)
      console.log(stake_net_quantity)
      console.log(stake_cpu_quantity)
      console.log(transfer)
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
