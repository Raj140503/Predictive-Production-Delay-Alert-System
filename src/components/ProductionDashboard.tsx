import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Factory,
  Cpu,
  BarChart3,
  Clock,
  Users,
  Wrench,
  Package,
  Target,
  Brain,
  Shield
} from 'lucide-react';
import heroImage from '@/assets/hero-manufacturing.jpg';

interface ProductionMetrics {
  rawMaterialAvailability: number;
  machineAvailability: number;
  shiftCapacityUtilization: number;
  workstationEfficiency: number;
  orderComplexity: number;
  supplierReliability: number;
  quantity: number;
  productionItem: string;
}

const ProductionDashboard = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<ProductionMetrics>({
    rawMaterialAvailability: 85,
    machineAvailability: 90,
    shiftCapacityUtilization: 75,
    workstationEfficiency: 80,
    orderComplexity: 5,
    supplierReliability: 85,
    quantity: 100,
    productionItem: 'Standard Widget'
  });

  const [delayRisk, setDelayRisk] = useState<{
    risk: number;
    level: 'low' | 'medium' | 'high';
    prediction: string;
  }>({
    risk: 0,
    level: 'low',
    prediction: ''
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stats] = useState({
    modelAccuracy: 89,
    predictionsMade: 1547,
    delaysPreventeda: 234,
    efficiencyGain: 15.8
  });

  const calculateDelayRisk = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const factors = [
        100 - metrics.rawMaterialAvailability,
        100 - metrics.machineAvailability,
        100 - metrics.shiftCapacityUtilization,
        100 - metrics.workstationEfficiency,
        metrics.orderComplexity * 10,
        100 - metrics.supplierReliability
      ];
      
      const totalRisk = factors.reduce((sum, factor) => sum + factor, 0) / factors.length;
      const adjustedRisk = Math.min(Math.max(totalRisk + (Math.random() * 10 - 5), 0), 100);
      
      let level: 'low' | 'medium' | 'high' = 'low';
      let prediction = '';
      
      if (adjustedRisk < 25) {
        level = 'low';
        prediction = 'Production on track - minimal delay risk detected';
      } else if (adjustedRisk < 60) {
        level = 'medium';
        prediction = 'Moderate delay risk - monitor key metrics closely';
      } else {
        level = 'high';
        prediction = 'High delay risk - immediate attention required';
      }
      
      setDelayRisk({
        risk: Math.round(adjustedRisk),
        level,
        prediction
      });
      
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Delay risk: ${Math.round(adjustedRisk)}% (${level})`,
        variant: level === 'high' ? 'destructive' : 'default'
      });
    }, 2000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'destructive';
      default: return 'secondary';
    }
  };

  const getEfficiencyColor = (value: number) => {
    if (value >= 80) return 'efficiency-high';
    if (value >= 60) return 'efficiency-medium';
    return 'efficiency-low';
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Predictive Production
              <span className="block text-primary">Delay Alert System</span>
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <Factory className="h-6 w-6 text-primary" />
              <Badge variant="outline" className="bg-primary/10 border-primary text-primary">
                AI-Powered Manufacturing
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Harness the power of machine learning to predict and prevent production delays 
              before they impact your manufacturing schedule.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button 
                variant="predict" 
                size="lg" 
                onClick={calculateDelayRisk}
                disabled={isAnalyzing}
                className="group px-8 py-4 text-base font-semibold"
              >
                <Brain className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                {isAnalyzing ? 'Analyzing...' : 'Predict Delay Risk'}
              </Button>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span>{stats.modelAccuracy}% Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-accent" />
                  <span>{stats.predictionsMade.toLocaleString()} Predictions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Production Parameters */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-card border-border/50 shadow-elegant animate-slide-in">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Production Order Configuration
                </CardTitle>
                <CardDescription>
                  Configure your production parameters to get accurate delay predictions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Production Item & Quantity */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="production-item">Production Item</Label>
                    <Select 
                      value={metrics.productionItem} 
                      onValueChange={(value) => setMetrics(prev => ({ ...prev, productionItem: value }))}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select item" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard Widget">Standard Widget</SelectItem>
                        <SelectItem value="Premium Gadget">Premium Gadget</SelectItem>
                        <SelectItem value="Smart Device">Smart Device</SelectItem>
                        <SelectItem value="Industrial Component">Industrial Component</SelectItem>
                        <SelectItem value="Custom Assembly">Custom Assembly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Production Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={metrics.quantity}
                      onChange={(e) => setMetrics(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <Separator className="bg-border" />

                {/* Availability Metrics */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Activity className="h-5 w-5 text-accent" />
                    Resource Availability
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Raw Material Availability</Label>
                        <Badge variant="outline" className={`text-${getEfficiencyColor(metrics.rawMaterialAvailability)}`}>
                          {metrics.rawMaterialAvailability}%
                        </Badge>
                      </div>
                      <Slider
                        value={[metrics.rawMaterialAvailability]}
                        onValueChange={(value) => setMetrics(prev => ({ ...prev, rawMaterialAvailability: value[0] }))}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <Progress value={metrics.rawMaterialAvailability} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Machine Availability</Label>
                        <Badge variant="outline" className={`text-${getEfficiencyColor(metrics.machineAvailability)}`}>
                          {metrics.machineAvailability}%
                        </Badge>
                      </div>
                      <Slider
                        value={[metrics.machineAvailability]}
                        onValueChange={(value) => setMetrics(prev => ({ ...prev, machineAvailability: value[0] }))}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <Progress value={metrics.machineAvailability} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Shift Capacity Utilization</Label>
                        <Badge variant="outline" className={`text-${getEfficiencyColor(metrics.shiftCapacityUtilization)}`}>
                          {metrics.shiftCapacityUtilization}%
                        </Badge>
                      </div>
                      <Slider
                        value={[metrics.shiftCapacityUtilization]}
                        onValueChange={(value) => setMetrics(prev => ({ ...prev, shiftCapacityUtilization: value[0] }))}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <Progress value={metrics.shiftCapacityUtilization} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Workstation Efficiency</Label>
                        <Badge variant="outline" className={`text-${getEfficiencyColor(metrics.workstationEfficiency)}`}>
                          {metrics.workstationEfficiency}%
                        </Badge>
                      </div>
                      <Slider
                        value={[metrics.workstationEfficiency]}
                        onValueChange={(value) => setMetrics(prev => ({ ...prev, workstationEfficiency: value[0] }))}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <Progress value={metrics.workstationEfficiency} className="h-2" />
                    </div>
                  </div>
                </div>

                <Separator className="bg-border" />

                {/* Additional Factors */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-accent" />
                    Production Factors
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Order Complexity (1-10)</Label>
                        <Badge variant="outline" className="text-accent">
                          {metrics.orderComplexity}/10
                        </Badge>
                      </div>
                      <Slider
                        value={[metrics.orderComplexity]}
                        onValueChange={(value) => setMetrics(prev => ({ ...prev, orderComplexity: value[0] }))}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <Progress value={metrics.orderComplexity * 10} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Supplier Reliability</Label>
                        <Badge variant="outline" className={`text-${getEfficiencyColor(metrics.supplierReliability)}`}>
                          {metrics.supplierReliability}%
                        </Badge>
                      </div>
                      <Slider
                        value={[metrics.supplierReliability]}
                        onValueChange={(value) => setMetrics(prev => ({ ...prev, supplierReliability: value[0] }))}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <Progress value={metrics.supplierReliability} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results & Statistics */}
          <div className="space-y-6">
            {/* Prediction Result */}
            <Card className="bg-gradient-card border-border/50 shadow-elegant animate-fade-in-up">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Prediction Result
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {delayRisk.prediction ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`text-4xl font-bold text-${getRiskColor(delayRisk.level)} mb-2`}>
                        {delayRisk.risk}%
                      </div>
                      <Badge 
                        variant={delayRisk.level === 'high' ? 'destructive' : delayRisk.level === 'medium' ? 'secondary' : 'outline'}
                        className="mb-4"
                      >
                        {delayRisk.level.toUpperCase()} RISK
                      </Badge>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
                      <p className="text-sm text-muted-foreground text-center">
                        {delayRisk.prediction}
                      </p>
                    </div>
                    <Progress value={delayRisk.risk} className="h-3" />
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Cpu className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-float" />
                    <p className="text-muted-foreground">
                      Configure parameters and click "Predict Delay Risk" to get AI-powered insights
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Key Statistics */}
            <Card className="bg-gradient-card border-border/50 shadow-elegant">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats.modelAccuracy}%</div>
                    <div className="text-xs text-muted-foreground">Model Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{stats.predictionsMade.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Predictions Made</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{stats.delaysPreventeda}</div>
                    <div className="text-xs text-muted-foreground">Delays Prevented</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">+{stats.efficiencyGain}%</div>
                    <div className="text-xs text-muted-foreground">Efficiency Gain</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card className="bg-gradient-card border-border/50 shadow-elegant">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-sm">AI-Powered Predictions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-accent" />
                    <span className="text-sm">Real-time Analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="h-4 w-4 text-success" />
                    <span className="text-sm">89% Accuracy Rate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-warning" />
                    <span className="text-sm">Performance Optimization</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionDashboard;