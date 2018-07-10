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
      this.makeAccount(this.eos, this.ownerPublicKey, this.activePublicKey, this.creatorAccountName, this.newAccountName, this.ramBytes, this.stakeNetQuantity, this.stakeCpuQuantity)
    }
  }


  makeAccount(eos, ownerPublicKey, activePublicKey, creatorAccountName, newAccountName, ramBytes, stakeNetQuantity, stakeCpuQuantity) {
    
    // eos = the eos object created with the provatekey of the creator
    // ownerPublicKey = 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'
    // activePublicKey = 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'
    // creatorAccountName "helloeosblox"
    // newAccountName = "mynewaccount"
    // ramBytes = the amount of ram to buy ()
    // stakeNetQuantity = '0.001 EOS'
    // stakeCpuQuantity = '0.001 EOS'

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
        bytes: ramBytes || 4000
      })

      tr.delegatebw({
        from: creatorAccountName,
        receiver: newAccountName,
        stake_net_quantity: stakeNetQuantity || '0.001 EOS',
        stake_cpu_quantity: stakeCpuQuantity || '0.001 EOS',
        transfer: 0
      })
    })
  }

} window.customElements.define('blox-account', BloxAccount);
