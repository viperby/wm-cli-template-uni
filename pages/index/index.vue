<template>
	<view class="wm-page">
		<view class="content">
			<view @tap="toEhs" class="wm-block">
				<view class="wm-block__socure"></view>
				<view class="wm-block__box">
					<view class="wm-block__content">
						<text class="text">唯迈</text>
					</view>
				</view>
			</view>
			<br/>
			<view class="des">
				<view>
					<text>快速构建移动端框架</text>
				</view>
				<view>
					<text>整合colorui,scss,主题化,常用工具</text>
				</view>
				<view>
					<text>更多酷炫内容正在研发中</text>
				</view>
			</view>
		</view>
		<text style="position: absolute;bottom: 5px;left:30%;color:#fff">[唯迈·前端 主要适配]</text>
	</view>
</template>

<script>
	export default {
		onLoad() {
			
		},
		data() {
			return {
				
			}
		},
		methods: {

		},
		mounted() {
		}
	}
</script>

<style>
	.des{
		color:#fff;
		line-height: 2;
	}
	.text{
		color:#fff;
		font-size: 26px;
		font-weight: 600;
	}
	.content{
		text-align: center;
		position: absolute;
		top:30%;
		width: 100%;
	}
</style>

