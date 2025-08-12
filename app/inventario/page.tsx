"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layout } from "@/components/layout"
import RequireAuth from "@/components/RequireAuth"
import {
  Search,
  Plus,
  Package,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Eye,
} from "lucide-react"

const inventarioData = [
  {
    id: 1,
    codigo: "VAC-COVID-001",
    nombre: "Vacuna COVID-19 Pfizer",
    categoria: "Vacunas",
    unidad: "Dosis",
    stockActual: 245,
    stockMinimo: 100,
    stockMaximo: 500,
    lote: "PF2025-456",
  // removed erroneous import

    vencimiento: "2025-12-31",
    territorio: "T1",
    ubicacion: "Refrigerador A1",
    estado: "Disponible",
    ultimoMovimiento: "2025-05-15",
  },
  {
    id: 2,
    codigo: "MED-PARA-001",
    nombre: "Paracetamol 500mg",
    categoria: "Medicamentos",
    unidad: "Tabletas",
    stockActual: 45,
    stockMinimo: 100,
    stockMaximo: 1000,
    lote: "PAR2025-123",
    vencimiento: "2025-08-15",
    territorio: "T2",
    ubicacion: "Estante B2",
    estado: "Stock Crítico",
    ultimoMovimiento: "2025-05-14",
  },
  {
    id: 3,
    codigo: "INS-JER-001",
    nombre: "Jeringas 3ml",
    categoria: "Insumos",
    unidad: "Unidades",
    stockActual: 1250,
    stockMinimo: 500,
    stockMaximo: 2000,
    lote: "JER2025-789",
    vencimiento: "2027-05-01",
    territorio: "T1",
    ubicacion: "Almacén General",
    estado: "Disponible",
    ultimoMovimiento: "2025-05-13",
  },
  {
    id: 4,
    codigo: "VAC-INF-001",
    nombre: "Vacuna Influenza",
    categoria: "Vacunas",
    unidad: "Dosis",
    stockActual: 12,
    stockMinimo: 50,
    stockMaximo: 300,
    lote: "INF2025-321",
    vencimiento: "2025-06-30",
    territorio: "T3",
    ubicacion: "Refrigerador B1",
    estado: "Próximo a Vencer",
    ultimoMovimiento: "2025-05-12",
  },
  {
    id: 5,
    codigo: "MED-IBU-001",
    nombre: "Ibuprofeno 400mg",
    categoria: "Medicamentos",
    unidad: "Tabletas",
    stockActual: 890,
    stockMinimo: 200,
    stockMaximo: 1000,
    lote: "IBU2025-654",
    vencimiento: "2026-03-20",
    territorio: "T2",
    ubicacion: "Estante A3",
    estado: "Disponible",
    ultimoMovimiento: "2025-05-10",
  },
]

export default function InventarioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoriaFilter, setCategoriaFilter] = useState("todas")
  const [estadoFilter, setEstadoFilter] = useState("todos")
  const [territorioFilter, setTerritorioFilter] = useState("todos")

  const filteredInventario = inventarioData.filter((item) => {
    const matchesSearch =
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lote.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategoria = categoriaFilter === "todas" || item.categoria === categoriaFilter
    const matchesEstado = estadoFilter === "todos" || item.estado === estadoFilter
    const matchesTerritorio = territorioFilter === "todos" || item.territorio === territorioFilter

    return matchesSearch && matchesCategoria && matchesEstado && matchesTerritorio
  })

  const getEstadoBadge = (estado: string, stockActual: number, stockMinimo: number) => {
    if (estado === "Stock Crítico" || stockActual <= stockMinimo) {
      return <Badge className="bg-red-100 text-red-800">Stock Crítico</Badge>
    }
    if (estado === "Próximo a Vencer") {
      return <Badge className="bg-yellow-100 text-yellow-800">Próximo a Vencer</Badge>
    }
    return <Badge className="bg-green-100 text-green-800">Disponible</Badge>
  }

  const getStockIndicator = (actual: number, minimo: number, maximo: number) => {
    const percentage = (actual / maximo) * 100
    if (actual <= minimo) {
      return <TrendingDown className="w-4 h-4 text-red-600" />
    }
    if (percentage > 80) {
      return <TrendingUp className="w-4 h-4 text-green-600" />
    }
    return <Package className="w-4 h-4 text-blue-600" />
  }

  return (
    <RequireAuth>
      <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <Package className="w-8 h-8 mr-3 text-blue-600" />
              Inventario de Insumos
            </h1>
            <p className="text-blue-600">Control de stock y gestión de insumos médicos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Insumo
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Insumos</p>
                  <p className="text-2xl font-bold text-blue-900">1,247</p>
                  <p className="text-xs text-blue-600">Diferentes tipos</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Stock Crítico</p>
                  <p className="text-2xl font-bold text-red-600">23</p>
                  <p className="text-xs text-red-600">Requieren reposición</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Próximos a Vencer</p>
                  <p className="text-2xl font-bold text-yellow-600">8</p>
                  <p className="text-xs text-yellow-600">Próximos 30 días</p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Valor Total</p>
                  <p className="text-2xl font-bold text-green-600">Q 456,789</p>
                  <p className="text-xs text-green-600">Inventario actual</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y Búsqueda */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="Buscar por código, nombre o lote..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 border-blue-200 focus:border-blue-500"
                />
              </div>
              <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="Vacunas">Vacunas</SelectItem>
                  <SelectItem value="Medicamentos">Medicamentos</SelectItem>
                  <SelectItem value="Insumos">Insumos</SelectItem>
                </SelectContent>
              </Select>
              <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Stock Crítico">Stock Crítico</SelectItem>
                  <SelectItem value="Próximo a Vencer">Próximo a Vencer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={territorioFilter} onValueChange={setTerritorioFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Territorio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="T1">Territorio 1</SelectItem>
                  <SelectItem value="T2">Territorio 2</SelectItem>
                  <SelectItem value="T3">Territorio 3</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
                Limpiar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Inventario */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-900">Control de Inventario</CardTitle>
                <CardDescription>
                  Mostrando {filteredInventario.length} de {inventarioData.length} insumos
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                  Movimientos
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                  Columnas
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-blue-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="text-blue-900 font-semibold">Código</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Insumo</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Stock Actual</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Lote/Vencimiento</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Ubicación</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Estado</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Último Movimiento</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventario.map((item) => (
                    <TableRow key={item.id} className="hover:bg-blue-50/50">
                      <TableCell className="font-mono text-sm">{item.codigo}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{item.nombre}</div>
                          <Badge variant="outline" className="text-xs">
                            {item.categoria}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStockIndicator(item.stockActual, item.stockMinimo, item.stockMaximo)}
                          <div className="space-y-1">
                            <div className="font-semibold">
                              {item.stockActual.toLocaleString()} {item.unidad}
                            </div>
                            <div className="text-xs text-gray-600">
                              Min: {item.stockMinimo} | Max: {item.stockMaximo}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-mono text-sm">{item.lote}</div>
                          <div className="text-xs text-gray-600">{item.vencimiento}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{item.territorio}</div>
                          <div className="text-xs text-gray-600">{item.ubicacion}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getEstadoBadge(item.estado, item.stockActual, item.stockMinimo)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-600" />
                          <span className="text-sm">{item.ultimoMovimiento}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-blue-600">Mostrando 1-5 de {filteredInventario.length} resultados</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled className="border-blue-200 bg-transparent">
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 bg-blue-600 text-white">
                  1
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                  2
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                  Siguiente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </Layout>
    </RequireAuth>
  )
}
