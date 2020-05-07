import React, { Component, Fragment } from 'react'
import { Card, Form, Button, Tag, DatePicker, message, Select, List, Avatar, Modal } from 'antd'
import { connect } from 'react-redux'
import { getorderplacename } from '../../actions/order'
import { getrootorderdetail, getrootorderdel, getrootordercancel, getrootorderok } from '../../actions/rootorder'
import moment from 'moment'
const FormItem = Form.Item;
const { confirm } = Modal;
const { Option } = Select
const mapState = state => ({
    data: state.order.list,
    list: state.rootorder.list,
    username: state.user.username
})
@connect(mapState, { getorderplacename, getrootorderdetail, getrootorderdel, getrootordercancel, getrootorderok })

class RootOrder extends Component {
    state = {
        color: "orange",
        time: moment(Date.now()),
        place_title: '羽毛球',
        list: [],
        placeNum: '1号场地'
    }


    componentDidMount() {
        this.props.getorderplacename()
        this.handleSearch()
    }
    //预约
    handleOrderOk = (item) => {
        let _this = this;
        const params = {
            id: item.id,
            place_person: this.props.username,
            place_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            status: 1
        }
        confirm({
            title: `您确定要预约${item.time.split(' ')[0]}  ${item.title}这个时间段吗？`,
            content: `${item.placeNum}-${item.place_name}`,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                _this.props.getrootorderok(params)
                    .then((res) => {
                        if (res.data.err === 0) {
                            _this.handleSearch();
                            message.success('预约成功，欢迎再次预约！')
                        } else {
                            _this.handleSearch();
                            message.error('预约失败，请重试！')
                        }
                    })
                    .catch(() => {
                        _this.handleSearch();
                        message.error('预约失败，请重试！')
                    })
            },
            onCancel() {
                console.log('取消');
            },
        });
    }
    //取消预约
    handleCancel = (item) => {
        const params = {
            id: item.id,
            status: 0,
            place_person: "",
            place_time: ""
        }
        let _this = this;
        confirm({
            title: `您确定要取消${item.time.split(' ')[0]}  ${item.title}这个时间段的预约吗？`,
            content: `${item.placeNum}-${item.place_name}`,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                _this.props.getrootordercancel(params)
                    .then((res) => {
                        if (res.data.err === 0) {
                            _this.handleSearch();
                            message.success('取消成功，欢迎再次预约！')
                        } else {
                            _this.handleSearch();
                            message.error('取消失败，请重试！')
                        }
                    })
                    .catch(() => {
                        _this.handleSearch();
                        message.error('取消失败，请重试！')
                    })
            },
            onCancel() {
                console.log('取消');
            },
        });
    }
    //删除预约
    handleDel = (item) => {
        const params = {
            id: item.id
        }
        let _this = this
        confirm({
            title: `您确定要删除${item.time.split(' ')[0]}  ${item.title}这个时间段吗？`,
            content: `${item.placeNum}-${item.place_name}`,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                _this.props.getrootorderdel(params)
                    .then((res) => {
                        if (res.data.err === 0) {
                            message.success("删除成功！")
                            _this.handleSearch()
                        } else {
                            message.error("删除失败！")
                            _this.handleSearch()
                        }
                    })
                    .catch(() => {
                        message.error("删除失败")
                        _this.handleSearch()
                    })
            },
            onCancel() {
                console.log('取消');
            },
        });

    }
    //查询
    handleSearch = () => {
        const { time, place_title,placeNum } = this.state;
        if (time === "" || place_title === "") {
            message.warning("请先选择查询条件")
        } else {
            const params = {
                time: moment(time).format('YYYY-MM-DD'),
                place_title,
                placeNum
            }
            console.log(params);
            
            this.props.getrootorderdetail(params)
            let settime = setTimeout(() => {
                if (this.props.list.length === 0) {
                    message.warning("暂无该数据")
                    clearTimeout(settime)
                }
            }, 1000)
        }

    }
    //获取所预约场地时间
    onTimeChange = (date, dateString) => {
        this.setState({
            time: dateString
        })
    }
    //获取场地名称
    handleSelectChange = (value) => {
        this.setState({
            place_title: value
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
        const data = this.props.data
        return (
            <div>
                <Card title="预约数据管理">
                    <Form layout="inline" >
                        <FormItem label="场地号">
                            <Select defaultValue={this.state.placeNum} onChange={this.onSelectChange}>
                                <Select.Option value="1号场地">1号场地</Select.Option>
                                <Select.Option value="2号场地">2号场地</Select.Option>
                                <Select.Option value="3号场地">3号场地</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem label="场地名称" >
                            <Select placeholder="请选择场地名称" defaultValue={this.state.place_title} style={{ width: 150 }} onChange={this.handleSelectChange}>
                                {
                                    data ? data.map((item) => {
                                        return <Option value={item.place_title} key={item.place_name}>{item.place_title}</Option>
                                    }) : ""
                                }
                            </Select>
                        </FormItem>
                        <FormItem label="所预约场地时间" >
                            <DatePicker placeholder="请选择日期" defaultValue={moment()} format="YYYY-MM-DD" onChange={this.onTimeChange} />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSearch}>查询</Button>
                        </FormItem>
                    </Form>

                </Card>
                <div>
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
                                            title={<Fragment><Tag>{item.place_name}</Tag><Tag>{item.time ? item.time.split(' ')[0] : ""}</Tag></Fragment>}
                                        description={<Fragment><Tag>{item.placeNum} : {item.title}</Tag></Fragment>}
                                        />
                                    }>
                                    {
                                        item.description
                                    }
                                    {
                                        item.time < moment().format('YYYY-MM-DD HH:mm:ss')
                                            ?
                                            <Fragment>
                                                <Tag color='gray' style={{ marginTop: '20px' }} title="已过期，不可预约">已过期，不可预约</Tag>
                                                <Button type="danger" size="small" onClick={() => this.handleDel(item)}>删除</Button>
                                            </Fragment>

                                            :
                                            item.status === 1
                                                ?
                                                <Fragment>
                                                    <Tag color="red" style={{ marginTop: '20px' }} title="已被预约">{`预约人—${item.place_person}`}</Tag>
                                                    <Button type="primary" size="small" onClick={() => this.handleCancel(item)}>取消预约</Button>
                                                </Fragment>
                                                :
                                                <Button type="primary" size="small" style={{ marginTop: '20px' }} title="可以预约" onClick={() => this.handleOrderOk(item)}>可以预约</Button>
                                    }
                                </Card>
                            </List.Item>
                        )}
                    />


                </div>
            </div>
        )
    }
}

export default RootOrder
