import React from 'react';
import { Form, Input, Button, Col, Row, Collapse } from 'antd';
import './App.css';
import { submitValue } from './types/FormSubmitType';
import { getUserRepo, searchUser } from './redux/actions/searchUser';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from './redux/store/store';

const { Panel } = Collapse;
function App() {
  const dispatch = useDispatch()
  const { userListData } = useSelector((state: RootState) => state.userList)
  const onFinish = (values:submitValue ) => {
    const { userName } = values;
    searchUser(userName,dispatch)
  }

  const onFinishFailed = (errorInfo:any) => {

  }

  const onChangeCollapse = (active:any) => {
    console.log(active)
    const newIndex = userListData?.items.find((v) => v.id == active[0])?.login as string
    getUserRepo(newIndex,dispatch) 
  }

  return (
      <Row className='main-div'>
        <Col span={8}></Col>
        <Col span={8} >
          <Form
            name="search"
            layout='vertical'
            autoComplete='off'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            
            <Form.Item 
               name='userName' rules={[{required:true, message: 'Please Input your username!'}]} >
              <Input placeholder='Enter Username'/>
            </Form.Item>

            <Form.Item>
              <Button className='submit-btn' type='primary' htmlType='submit' >
                Search
              </Button>
            </Form.Item>

            <Collapse accordion onChange={onChangeCollapse}>
            {userListData && userListData.items && userListData.items.map((v,i) => (
              <Panel header={v.login} key={v.id}>
                {v.repoList?.map((x,i) => (
                  <div key={x.id}>
                    <h3>{x.name}</h3>
                    <p>{x.description}</p>
                  </div>
                ))}
              </Panel>
            ))}
            </Collapse>

          </Form>
        </Col>
        <Col span={8}></Col>
      </Row>

  );
}

export default App;
