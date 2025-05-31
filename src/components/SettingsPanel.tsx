import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Settings, 
  Heart, 
  Eye, 
  Trash2, 
  Download, 
  Upload,
  X,
  BarChart3
} from 'lucide-react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface SettingsPanelProps {
  facts: any[];
  isVisible: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ facts, isVisible, onClose }) => {
  const { 
    favorites, 
    viewHistory, 
    clearFavorites, 
    clearViewHistory,
    exportUserData,
    importUserData
  } = useUserPreferences();
  
  const { theme, setTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    autoPlay: false,
    notifications: false,
    animations: true
  });

  const favoriteFacts = facts.filter(fact => favorites.includes(fact.id));
  const recentlyViewed = facts.filter(fact => viewHistory.includes(fact.id)).slice(0, 10);

  const handleExportData = () => {
    const data = exportUserData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'factfact-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          importUserData(data);
          alert('설정을 성공적으로 가져왔습니다!');
        } catch (error) {
          alert('파일을 읽는 중 오류가 발생했습니다.');
        }
      };
      reader.readAsText(file);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6" />
            <CardTitle>설정 및 통계</CardTitle>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* 앱 설정 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5" />
              앱 설정
            </h3>
            
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="theme">테마</Label>
                <select 
                  value={theme} 
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                >
                  <option value="light">라이트</option>
                  <option value="dark">다크</option>
                  <option value="system">시스템</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="animations">애니메이션</Label>
                <Switch 
                  id="animations"
                  checked={settings.animations}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, animations: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="autoplay">자동 재생</Label>
                <Switch 
                  id="autoplay"
                  checked={settings.autoPlay}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoPlay: checked }))}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* 통계 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              사용 통계
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{favorites.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">즐겨찾기</div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{viewHistory.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">조회한 Facts</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* 즐겨찾기 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Heart className="w-5 h-5" />
                즐겨찾기 ({favorites.length})
              </h3>
              {favorites.length > 0 && (
                <Button onClick={clearFavorites} variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  모두 삭제
                </Button>
              )}
            </div>
            
            {favoriteFacts.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {favoriteFacts.slice(0, 5).map((fact) => (
                  <div key={fact.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{fact.text}</p>
                    <Badge variant="outline" className="mt-1 text-xs">{fact.category}</Badge>
                  </div>
                ))}
                {favoriteFacts.length > 5 && (
                  <p className="text-sm text-gray-500 text-center">+{favoriteFacts.length - 5}개 더</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">아직 즐겨찾기가 없습니다</p>
            )}
          </div>

          <Separator />

          {/* 최근 조회 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Eye className="w-5 h-5" />
                최근 조회
              </h3>
              {viewHistory.length > 0 && (
                <Button onClick={clearViewHistory} variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  기록 삭제
                </Button>
              )}
            </div>
            
            {recentlyViewed.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {recentlyViewed.slice(0, 5).map((fact) => (
                  <div key={fact.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{fact.text}</p>
                    <Badge variant="outline" className="mt-1 text-xs">{fact.category}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">조회 기록이 없습니다</p>
            )}
          </div>

          <Separator />

          {/* 데이터 관리 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">데이터 관리</h3>
            
            <div className="flex gap-2">
              <Button onClick={handleExportData} variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                설정 내보내기
              </Button>
              
              <div className="flex-1">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                  id="import-settings"
                />
                <Button asChild variant="outline" className="w-full">
                  <label htmlFor="import-settings" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    설정 가져오기
                  </label>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;
