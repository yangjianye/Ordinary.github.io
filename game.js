// 办公室录音攻防战游戏主类
class OfficeRecordingGame {
    constructor() {
        // 获取DOM元素
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.startBtn = document.getElementById('start-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.recordingProgress = document.getElementById('recording-progress');
        this.currentScene = document.getElementById('current-scene');
        this.sceneBackground = document.getElementById('scene-background');
        this.speaker = document.getElementById('speaker');
        this.dialogueText = document.getElementById('dialogue-text');
        this.choiceA = document.getElementById('choice-a');
        this.choiceB = document.getElementById('choice-b');
        this.resultTitle = document.getElementById('result-title');
        this.resultMessage = document.getElementById('result-message');
        
        // 游戏状态
        this.gameData = {
            progress: 0,          // 录音进度 0-3
            currentSceneIndex: 0, // 当前场景索引
            currentPhase: 0,      // 当前阶段索引
            isRecording: false,   // 是否正在录音
            isGameOver: false     // 游戏是否结束
        };
        
        // 游戏场景数据
        this.scenes = [
            // 场景一：日常办公区录音
            {
                name: '日常办公区录音',
                backgroundClass: 'scene1',
                phases: [
                    {
                        dialogue: '你口袋里装的什么？拿出来看看？',
                        choices: {
                            A: {
                                text: '假装整理衣服，顺势将设备压入裤腰内侧，笑着回应："没什么，就是充电宝，刚充完电没来得及放包里"',
                                success: true,
                                successText: '领导点点头继续交代工作，你可以继续录音。',
                                progressGain: 1
                            },
                            B: {
                                text: '紧张地捂住口袋，支支吾吾说 "没、没什么"',
                                success: false,
                                failureText: '领导起疑，伸手要求查看，发现录音设备，怒道："你居然敢录音？明天不用来了！"'
                            }
                        }
                    },
                    {
                        dialogue: '你手在口袋里捣鼓什么？专心听我说话！',
                        choices: {
                            A: {
                                text: '立刻抽出手假装挠头，顺势调整坐姿："哦，刚才有点痒，您继续说，我记着呢"',
                                success: true,
                                successText: '领导未深究，录音持续进行。'
                            },
                            B: {
                                text: '保持手在口袋里不动，硬着头皮回应 "没什么"',
                                success: false,
                                failureText: '领导走近掰开玩家口袋，发现录音操作，当场销毁设备并上报。'
                            }
                        }
                    }
                ]
            },
            // 场景二：会议室秘密谈话
            {
                name: '会议室秘密谈话',
                backgroundClass: 'scene2',
                phases: [
                    {
                        dialogue: '最近公司有泄密风险，大家把随身电子设备都放桌上检查一下',
                        choices: {
                            A: {
                                text: '提前将录音设备调至 "静音 + 伪装模式"（屏幕黑屏、无指示灯），混在笔记本电脑、手机中，主动推到桌前："领导您看，都是常用设备，没别的"',
                                success: true,
                                successText: '领导快速扫过，未发现异常，返回座位继续会议。',
                                progressGain: 1
                            },
                            B: {
                                text: '慌乱中将设备藏到椅子底下，谎称 "我没带其他设备，就一个手机"',
                                success: false,
                                failureText: '领导绕到椅子后发现设备，按下播放键听到录音内容，当场让你离职。'
                            }
                        }
                    },
                    {
                        dialogue: '什么声音？谁那边来的？',
                        choices: {
                            A: {
                                text: '立刻拿起桌上的马克笔敲击文件，假装是笔帽碰撞声："应该是我这儿，马克笔没盖紧，刚才碰着了"，同时用手盖住设备屏蔽声音',
                                success: true,
                                successText: '其他同事附和 "我也听到了，好像是笔的声音"，领导不再追究。'
                            },
                            B: {
                                text: '沉默不语，假装没听到',
                                success: false,
                                failureText: '领导顺着声音找到设备，关闭录音并要求你删除所有录音文件。'
                            }
                        }
                    }
                ]
            },
            // 场景三：领导办公室单独谈话
            {
                name: '领导办公室单独谈话',
                backgroundClass: 'scene3',
                phases: [
                    {
                        dialogue: '你最近好像有心事，是不是有什么话想跟我说？',
                        choices: {
                            A: {
                                text: '立刻侧身避开，假装整理领带："领导，我就是有点担心项目进度，没别的心事"，同时将手机转移到上衣内兜（领导视线盲区）',
                                success: true,
                                successText: '领导收回手，回到办公桌后继续谈话，关键内容被成功录音。',
                                progressGain: 1
                            },
                            B: {
                                text: '僵硬地站着不动，任由领导触碰',
                                success: false,
                                failureText: '领导摸到裤兜里的手机，发现录音界面，愤怒地摔碎手机："你敢阴我？等着走法律程序吧！"'
                            }
                        }
                    },
                    {
                        dialogue: '对了，你手机借我打个电话，我手机没电了',
                        choices: {
                            A: {
                                text: '提前将录音文件加密备份并退出录音 APP，假装解锁手机时 "失手" 掉在地上，捡起后说："哎呀，手机刚才摔关机了，可能没电了，我回去给您拿充电宝？"',
                                success: true,
                                successText: '领导摆摆手说 "不用了"，你安全离开办公室。',
                                progressGain: 1
                            },
                            B: {
                                text: '犹豫着不肯交出手机，说 "我手机里有私人信息，不方便借"',
                                success: false,
                                failureText: '领导强行夺过手机，发现录音文件，删除后威胁你 "再敢搞小动作，让你在行业内混不下去"'
                            }
                        }
                    }
                ]
            }
        ];
        
        // 绑定事件
        this.bindEvents();
    }
    
    // 绑定事件监听
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.choiceA.addEventListener('click', () => this.makeChoice('A'));
        this.choiceB.addEventListener('click', () => this.makeChoice('B'));
    }
    
    // 开始游戏
    startGame() {
        // 重置游戏状态
        this.gameData = {
            progress: 0,
            currentSceneIndex: 0,
            currentPhase: 0,
            isRecording: true,
            isGameOver: false
        };
        
        // 更新UI
        this.updateProgressUI();
        this.currentScene.textContent = '准备开始';
        
        // 切换屏幕
        this.startScreen.classList.remove('active');
        this.gameScreen.classList.add('active');
        this.resultScreen.classList.remove('active');
        
        // 开始第一个场景
        this.startScene(this.gameData.currentSceneIndex);
    }
    
    // 开始一个场景
    startScene(sceneIndex) {
        const scene = this.scenes[sceneIndex];
        if (!scene) return;
        
        // 更新场景信息
        this.currentScene.textContent = scene.name;
        
        // 更新背景
        this.sceneBackground.className = 'scene-background';
        this.sceneBackground.classList.add(scene.backgroundClass);
        
        // 显示录音指示器
        this.showRecordingIndicator();
        
        // 重置场景阶段
        this.gameData.currentPhase = 0;
        
        // 开始第一个阶段
        this.startPhase(sceneIndex, 0);
    }
    
    // 开始一个阶段
    startPhase(sceneIndex, phaseIndex) {
        const scene = this.scenes[sceneIndex];
        const phase = scene.phases[phaseIndex];
        
        if (!phase) {
            // 如果当前场景所有阶段都完成，进入下一个场景
            this.gameData.currentSceneIndex++;
            if (this.gameData.currentSceneIndex < this.scenes.length) {
                // 延迟进入下一个场景，让玩家有时间反应
                setTimeout(() => {
                    this.showSceneTransition(`进入场景：${this.scenes[this.gameData.currentSceneIndex].name}`);
                }, 2000);
            } else {
                // 所有场景都完成，检查是否胜利
                this.checkVictory();
            }
            return;
        }
        
        // 更新对话内容
        this.dialogueText.textContent = phase.dialogue;
        
        // 更新选项内容
        this.choiceA.textContent = phase.choices.A.text;
        this.choiceB.textContent = phase.choices.B.text;
        
        // 启用选项按钮
        this.choiceA.disabled = false;
        this.choiceB.disabled = false;
    }
    
    // 玩家做出选择
    makeChoice(choice) {
        // 禁用选项按钮
        this.choiceA.disabled = true;
        this.choiceB.disabled = true;
        
        const scene = this.scenes[this.gameData.currentSceneIndex];
        const phase = scene.phases[this.gameData.currentPhase];
        const choiceData = phase.choices[choice];
        
        if (choiceData.success) {
            // 选择成功
            this.handleSuccess(choiceData);
        } else {
            // 选择失败
            this.handleFailure(choiceData);
        }
    }
    
    // 处理成功选择
    handleSuccess(choiceData) {
        // 显示成功文本
        this.dialogueText.textContent = choiceData.successText;
        
        // 更新进度（如果有）
        if (choiceData.progressGain) {
            this.gameData.progress += choiceData.progressGain;
            this.updateProgressUI();
            
            // 显示进度增加效果
            this.recordingProgress.classList.add('progress-increase');
            setTimeout(() => {
                this.recordingProgress.classList.remove('progress-increase');
            }, 1000);
        }
        
        // 检查是否胜利
        if (this.gameData.progress >= 3) {
            setTimeout(() => {
                this.showVictory();
            }, 2000);
            return;
        }
        
        // 进入下一阶段
        setTimeout(() => {
            this.gameData.currentPhase++;
            this.startPhase(this.gameData.currentSceneIndex, this.gameData.currentPhase);
        }, 2000);
    }
    
    // 处理失败选择
    handleFailure(choiceData) {
        // 显示失败文本
        this.dialogueText.textContent = choiceData.failureText;
        
        // 显示发现效果
        this.showDiscoveryEffect();
        
        // 结束游戏
        setTimeout(() => {
            this.gameOver(false);
        }, 3000);
    }
    
    // 更新进度UI
    updateProgressUI() {
        this.recordingProgress.textContent = `${this.gameData.progress}/3`;
    }
    
    // 显示录音指示器
    showRecordingIndicator() {
        // 移除旧的指示器
        const oldIndicator = document.querySelector('.recording-indicator');
        if (oldIndicator) oldIndicator.remove();
        
        // 创建新的指示器
        const indicator = document.createElement('div');
        indicator.className = 'recording-indicator';
        this.gameScreen.appendChild(indicator);
    }
    
    // 显示发现效果
    showDiscoveryEffect() {
        // 创建发现效果元素
        const effect = document.createElement('div');
        effect.className = 'discovery-effect';
        
        // 添加发现文字
        const text = document.createElement('h2');
        text.textContent = '被发现了！';
        text.style.color = 'white';
        text.style.fontSize = '3rem';
        text.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        
        effect.appendChild(text);
        this.gameScreen.appendChild(effect);
        
        // 移除录音指示器
        const indicator = document.querySelector('.recording-indicator');
        if (indicator) indicator.remove();
        
        // 5秒后移除效果
        setTimeout(() => {
            effect.remove();
        }, 3000);
    }
    
    // 显示场景过渡
    showSceneTransition(text) {
        // 创建过渡效果
        const transition = document.createElement('div');
        transition.style.position = 'absolute';
        transition.style.top = '0';
        transition.style.left = '0';
        transition.style.width = '100%';
        transition.style.height = '100%';
        transition.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        transition.style.display = 'flex';
        transition.style.justifyContent = 'center';
        transition.style.alignItems = 'center';
        transition.style.zIndex = '100';
        transition.style.animation = 'fadeIn 0.5s ease-in-out';
        
        // 添加文字
        const transitionText = document.createElement('h2');
        transitionText.textContent = text;
        transitionText.style.color = 'white';
        transitionText.style.fontSize = '2rem';
        
        transition.appendChild(transitionText);
        this.gameScreen.appendChild(transition);
        
        // 2秒后开始下一个场景
        setTimeout(() => {
            transition.style.animation = 'fadeOut 0.5s ease-in-out';
            setTimeout(() => {
                transition.remove();
                this.startScene(this.gameData.currentSceneIndex);
            }, 500);
        }, 2000);
    }
    
    // 检查胜利条件
    checkVictory() {
        if (this.gameData.progress >= 3) {
            this.showVictory();
        } else {
            // 如果所有场景都完成但进度不够，也判定为失败
            this.gameOver(false);
        }
    }
    
    // 显示胜利画面
    showVictory() {
        // 更新结果屏幕
        this.resultTitle.textContent = '游戏胜利！';
        this.resultTitle.style.color = '#27ae60';
        this.resultMessage.textContent = '你成功完成了3次关键录音，将加密备份的文件提交给上级监管部门，领导的违规行为被查处，你获得公司表彰！';
        
        // 切换屏幕
        this.gameScreen.classList.remove('active');
        this.resultScreen.classList.add('active');
        
        // 移除录音指示器
        const indicator = document.querySelector('.recording-indicator');
        if (indicator) indicator.remove();
    }
    
    // 游戏结束
    gameOver(isVictory) {
        this.gameData.isGameOver = true;
        
        // 更新结果屏幕
        if (isVictory) {
            this.resultTitle.textContent = '游戏胜利！';
            this.resultTitle.style.color = '#27ae60';
            this.resultMessage.textContent = '你成功完成了3次关键录音，将加密备份的文件提交给上级监管部门，领导的违规行为被查处，你获得公司表彰！';
        } else {
            this.resultTitle.textContent = '游戏失败';
            this.resultTitle.style.color = '#e74c3c';
            this.resultMessage.textContent = '你在录音过程中被领导发现，任务失败了！请重新开始游戏，小心应对每一个选择。';
        }
        
        // 切换屏幕
        this.gameScreen.classList.remove('active');
        this.resultScreen.classList.add('active');
    }
    
    // 重新开始游戏
    restartGame() {
        this.startGame();
    }
}

// 当页面加载完成后初始化游戏
window.addEventListener('load', () => {
    const game = new OfficeRecordingGame();
    window.game = game; // 方便调试
});

// 添加淡入淡出动画样式
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}
`;
document.head.appendChild(style);