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
      accountName: {
        type: String,
      },
      activePrivateKey: {
        type: String,
      },
      ownerPrivateKey: {
        type: String,
      },
      fundingAccountName: {
        type: String,
      },
      fundingPrivateKey: {
        type: String,
      },
      ramBytes: {
        type: Number,
      },
      stakeNetQuantity: {
        type: String,
      },
      stakeCpuQuantity: {
        type: String,
      },
    };
  }


  _makeAccount(){
    if(this.eos && this.ownerPublicKey && this.activePublicKey && this.creatorAccountName && this.newAccountName){
      this.makeAccount(this.eos, this.ownerPublicKey, this.activePublicKey, this.creatorAccountName, this.newAccountName)
    }
  }


  makeAccount(eos, ownerPublicKey, activePublicKey, creatorAccountName, newAccountName, ramBytes, stakeNetQuantity, stakeCpuQuantity) {
        
console.log('---- MAKING ACCOUNT ----')
console.log("eos:" )
console.log(eos)
console.log("ownerPublicKey:" +ownerPublicKey)
console.log("activePublicKey:" +activePublicKey)
console.log("creatorAccountName:" +creatorAccountName)
console.log("newAccountName:" +newAccountName)
console.log("ramBytes: 4000")
console.log("stakeNetQuantity: '0.001 EOS'")
console.log("stakeCpuQuantity: '0.001 EOS'")

    eos.transaction(tr => {
      tr.newaccount({
        creator: creatorAccountName,
        name: newAccountName,
        owner: ownerPublicKey,
        active: activePublicKey
      })

      tr.buyrambytes({
        payer: creatorAccountName,
        receiver: newAccountName,
        bytes: 4000
      })

      tr.delegatebw({
        from: creatorAccountName,
        receiver: newAccountName,
        stake_net_quantity: '0.001 EOS',
        stake_cpu_quantity: '0.001 EOS',
        transfer: 0
      })
    })
  }

} window.customElements.define('blox-account', BloxAccount);
