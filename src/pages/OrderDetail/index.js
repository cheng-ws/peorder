import React, { Component, Fragment } from 'react' //Fragement
import { List, Avatar, Tag, Button, Modal, Card, Form, DatePicker, Divider, message,Select } from 'antd';
import moment from 'moment'
import { connect } from 'react-redux'
import { getorderplacenamedetail, orderplaceperson } from '../../actions/order'
const { confirm } = Modal;
const FormItem = Form.Item;
const mapState = state => ({
    list: state.order.data,
    username: state.user.username
})
@connect(mapState, { getorderplacenamedetail, orderplaceperson })


class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            color: 'orange',
            time: moment(Date.now()),
            placeNum: '1号场地'
        };

    }

    componentDidMount() {
        const { location } = this.props;
        let arr = location.pathname.split('/')
        let placeName = arr[3]

        this.setState({
            title: localStorage.getItem('title'),
            placeName
        }, () => {
            this.handleSearch()
        })

    }
    handleOrder = (item) => {
        const { orderplaceperson } = this.props;
        let _this = this;
        const params = {
            id: item.id,
            place_person: this.props.username,
            place_time: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        confirm({
            title: `您确定要预约${item.title}这个时间段吗？`,
            content: `${item.placeNum}-${moment(item.time).format('YYYY-MM-DD')}`,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                orderplaceperson(params)
                    .then((res) => {
                        if (res.data.err === 0) {
                            _this.handleSearch()
                        } else {
                            message.warning('预约失败，请重试')
                            _this.handleSearch()
                        }
                    })
                    .catch(() => {
                        message.warning('预约失败，请重试')
                        _this.handleSearch()
                    })


            },
            onCancel() {
                console.log('取消');
            },
        });
    }
    handleSearch = () => {
        const params = {
            time: moment(this.state.time).format('YYYY-MM-DD'),
            placeName: this.state.placeName,
            placeNum: this.state.placeNum,
        }
        this.props.getorderplacenamedetail(params)
    }
    //获取时间
    onTimeChange = (date, dateString) => {
        this.setState({
            time: dateString
        })
    }
    //几号场地的选择
    onSelectChange = (val) => {
        this.setState({
            placeNum: val,
        })
    }
    render() {
        const list = this.props.list
        return (
            <Card title={`预约-${this.state.title}-场地`}>
                <Form layout="inline" >
                    <FormItem label="场地号">
                        <Select defaultValue="1号场地" onChange={this.onSelectChange}>
                            <Select.Option value="1号场地">1号场地</Select.Option>
                            <Select.Option value="2号场地">2号场地</Select.Option>
                            <Select.Option value="3号场地">3号场地</Select.Option>
                        </Select>
                    </FormItem>
                    <FormItem label="日期" >
                        <DatePicker placeholder="请选择日期" format="YYYY-MM-DD" onChange={this.onTimeChange} defaultValue={this.state.time} />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleSearch}>查询</Button>
                    </FormItem>
                </Form>
                <Divider type="horizontal" />

                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                style={{height: 200,overflow: 'hidden'}}
                                title={
                                    <Card.Meta
                                        avatar={
                                            <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
                                                {item.place_id}
                                            </Avatar>
                                        }
                                        title={<Fragment><Tag>{item.place_name} : {item.time ? item.time.split(' ')[0] : ""}</Tag></Fragment>}
                                        description={<Fragment><Tag>{item.placeNum} : {item.title}</Tag></Fragment>}
                                    />
                                }>
                                {
                                    item.description
                                }
                                {
                                    item.time < moment().format('YYYY-MM-DD HH:mm:ss')
                                        ?
                                        <Tag color='gray' style={{ marginTop: '20px' }} title="已过期，不可预约">已过期，不可预约</Tag>
                                        :
                                        item.status === 1
                                            ?
                                            <Tag color="red" style={{ marginTop: '20px' }} title="已被预约">已被预约</Tag>
                                            :
                                            <Button type="primary" size="small" style={{ marginTop: '20px' }} title="可预约" onClick={() => this.handleOrder(item)}>可预约</Button>
                                }
                            </Card>
                        </List.Item>
                    )}
                />

            </Card>
        )
    }
}

export default OrderDetail



