import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "FactFact은 무엇인가요?",
    answer: "FactFact은 과학, 역사, 동물, 음식 등 다양한 분야의 흥미로운 사실들을 탐험할 수 있는 모바일 친화적인 웹 앱입니다. 매일 새로운 지식을 얻고 친구들과 공유할 수 있습니다."
  },
  {
    question: "오늘의 Fact 기능은 어떻게 작동하나요?",
    answer: "오늘의 Fact는 매일 같은 시간에 동일한 사실을 보여주는 기능입니다. 연중 일자를 기준으로 계산되어 모든 사용자가 같은 날 같은 사실을 볼 수 있습니다."
  },
  {
    question: "즐겨찾기 기능을 어떻게 사용하나요?",
    answer: "각 Fact 카드의 하트(♥) 버튼을 클릭하면 즐겨찾기에 추가됩니다. 설정 패널에서 즐겨찾기 목록을 확인하고 관리할 수 있습니다."
  },
  {
    question: "다크 모드는 어떻게 활성화하나요?",
    answer: "헤더 우측의 테마 토글 버튼을 클릭하여 라이트, 다크, 시스템 테마 중에서 선택할 수 있습니다. 시스템 테마는 기기의 설정에 따라 자동으로 변경됩니다."
  },
  {
    question: "관리자 패널은 누가 사용할 수 있나요?",
    answer: "관리자 패널은 개발자와 콘텐츠 관리자가 새로운 Facts를 추가하고 관리하기 위한 도구입니다. 실제 운영에서는 접근 권한이 제한됩니다."
  },
  {
    question: "데이터는 어디에 저장되나요?",
    answer: "사용자 설정(즐겨찾기, 조회 기록)은 브라우저의 로컬 스토리지에 저장되며, Facts 데이터는 JSON 파일에서 로드됩니다. 개인정보는 수집하지 않습니다."
  },
  {
    question: "오프라인에서도 사용할 수 있나요?",
    answer: "PWA(Progressive Web App) 기능으로 한 번 방문하면 오프라인에서도 기본적인 기능을 사용할 수 있습니다. 홈 화면에 추가하여 앱처럼 사용 가능합니다."
  },
  {
    question: "새로운 Fact를 제안할 수 있나요?",
    answer: "현재는 관리자 패널을 통해서만 새로운 Facts를 추가할 수 있습니다. 향후 사용자 제안 기능을 추가할 예정입니다."
  }
];

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-yellow-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <HelpCircle className="w-6 h-6 text-blue-500" />
          자주 묻는 질문 (FAQ)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqData.map((item, index) => (
          <div 
            key={index}
            className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
          >
            <Button
              variant="ghost"
              onClick={() => toggleItem(index)}
              className="w-full p-4 text-left justify-between hover:bg-gray-50 dark:hover:bg-gray-700 h-auto"
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {item.question}
              </span>
              {openItems.includes(index) ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </Button>
            
            <div 
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                openItems.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="p-4 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FAQSection;
