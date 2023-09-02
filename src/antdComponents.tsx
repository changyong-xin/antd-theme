import { Button, ConfigProvider } from 'antd';
function AntdComponets() {
    return (
        <ConfigProvider
            theme={{
                token:{
                    colorPrimary:'orange'
                }
            }}
        >
            <div>
                <Button type='primary'>测试 </Button>
            </div>
        </ConfigProvider>
    );
}

export default AntdComponets;