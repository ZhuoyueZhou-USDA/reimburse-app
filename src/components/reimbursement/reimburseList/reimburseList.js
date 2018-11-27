import React, { Component } from 'react';
//import './reimburseList.less';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
class RecordList extends Component{
  
  render(){
    console.log('props',this.props);
    const { reimburse } = this.props;
    
    return (
      <div>
        <ul className="record-list-con">
        {/* {
          reimburse&&reimburse.map((item, index) => {
            return <li className="record-item" key={index}>
              <section className="record-item-header">
                <span>创建时间：{item.createdAt}</span>
                <span></span>
              </section>
              <section className="record-item-content">
                <p><span>用户名：</span>&emsp; </p>
                <p><span>商&emsp;品：</span></p>
                <p><span>金&emsp;额：</span>&emsp; 佣金：</p>
              </section>
              <p className="record-item-footer">等待管理员审核，审核通过后，佣金将结算至账户</p>
            </li>
          })
        } */}
        </ul>
      </div>
   
    );
  }

}
const mapStateToProps = (state)=>{
  console.log('map state to props',state);
  return {
    
    reimburse:state.firestore ? state.firestore.ordered.reimburseRequests:{}
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{collection:'reimburseRequests'}])
) (RecordList);