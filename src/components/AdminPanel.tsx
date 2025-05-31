import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Save, Download, Upload, Eye, EyeOff } from 'lucide-react';
import { Fact, FactFormData } from '@/types';
import { getFactCategories } from '@/constants';

interface AdminPanelProps {
  facts: Fact[];
  onAddFact?: (fact: FactFormData) => void;
  onUpdateFacts?: (facts: Fact[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ facts, onAddFact, onUpdateFacts }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FactFormData>({
    text: '',
    category: '',
    difficulty: 'medium',
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const { toast } = useToast();

  const categories = getFactCategories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.text.trim() || !formData.category) {
      toast({
        title: "필수 정보 누락",
        description: "Fact 내용과 카테고리를 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    const newFact: Fact = {
      id: Math.max(...facts.map(f => f.id), 0) + 1,
      text: formData.text.trim(),
      category: formData.category,
      difficulty: formData.difficulty,
      tags: formData.tags,
      createdAt: new Date().toISOString(),
      verified: false
    };

    if (onAddFact) {
      onAddFact(formData);
    }

    // JSON 형태로 출력하여 복사할 수 있도록
    const jsonOutput = JSON.stringify(newFact, null, 2);
    console.log('New Fact JSON:', jsonOutput);

    toast({
      title: "Fact 생성 완료!",
      description: "콘솔에서 JSON을 확인하고 facts.json에 추가하세요.",
      duration: 5000
    });

    // 폼 리셋
    setFormData({
      text: '',
      category: '',
      difficulty: 'medium',
      tags: []
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const exportFacts = () => {
    const dataStr = JSON.stringify({ facts }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'facts-export.json';
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "내보내기 완료",
      description: "Facts가 JSON 파일로 다운로드되었습니다."
    });
  };

  const generateFactsFromText = (text: string) => {
    // 간단한 텍스트 파싱 - 각 줄을 하나의 fact로 처리
    const lines = text.split('\n').filter(line => line.trim());
    const generatedFacts = lines.map((line, index) => ({
      id: Math.max(...facts.map(f => f.id), 0) + index + 1,
      text: line.trim(),
      category: formData.category || 'Science',
      createdAt: new Date().toISOString(),
      verified: false
    }));

    console.log('Generated Facts:', JSON.stringify(generatedFacts, null, 2));
    
    toast({
      title: `${generatedFacts.length}개 Fact 생성됨`,
      description: "콘솔에서 JSON을 확인하세요.",
      duration: 5000
    });
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          variant="outline"
          className="bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300"
        >
          <Eye className="w-4 h-4 mr-2" />
          관리자
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-purple-700">
            📚 Fact 관리자 패널
          </CardTitle>
          <Button
            onClick={() => setIsVisible(false)}
            size="sm"
            variant="outline"
          >
            <EyeOff className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 현재 통계 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{facts.length}</div>
              <div className="text-sm text-blue-600">총 Facts</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {new Set(facts.map(f => f.category)).size}
              </div>
              <div className="text-sm text-green-600">카테고리</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {facts.filter(f => f.verified).length}
              </div>
              <div className="text-sm text-purple-600">검증됨</div>
            </div>
          </div>

          {/* 새 Fact 추가 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Fact 내용 *</label>
              <Textarea
                value={formData.text}
                onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                placeholder="흥미로운 사실을 입력하세요..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">카테고리 *</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.icon} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">난이도</label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value: 'easy' | 'medium' | 'hard') => 
                    setFormData(prev => ({ ...prev, difficulty: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">🟢 쉬움</SelectItem>
                    <SelectItem value="medium">🟡 보통</SelectItem>
                    <SelectItem value="hard">🔴 어려움</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 태그 추가 */}
            <div>
              <label className="block text-sm font-medium mb-2">태그</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="태그 입력..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              <Save className="w-4 h-4 mr-2" />
              Fact 생성 (콘솔 출력)
            </Button>
          </form>

          {/* 유틸리티 버튼들 */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <Button onClick={exportFacts} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Facts 내보내기
            </Button>
            <Button 
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      try {
                        const data = JSON.parse(e.target?.result as string);
                        if (data.facts && Array.isArray(data.facts)) {
                          console.log('Imported Facts:', data.facts);
                          toast({
                            title: "파일 읽기 완료",
                            description: `${data.facts.length}개 Facts를 콘솔에서 확인하세요.`
                          });
                        }
                      } catch (err) {
                        toast({
                          title: "파일 오류",
                          description: "올바른 JSON 파일이 아닙니다.",
                          variant: "destructive"
                        });
                      }
                    };
                    reader.readAsText(file);
                  }
                };
                input.click();
              }}
              variant="outline"
            >
              <Upload className="w-4 h-4 mr-2" />
              Facts 가져오기
            </Button>
          </div>

          {/* 벌크 생성 */}
          <div className="pt-4 border-t">
            <label className="block text-sm font-medium mb-2">벌크 생성 (한 줄당 하나의 Fact)</label>
            <Textarea
              placeholder="각 줄에 하나씩 Fact를 입력하세요..."
              className="min-h-[80px] mb-2"
              onBlur={(e) => {
                if (e.target.value.trim()) {
                  generateFactsFromText(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
