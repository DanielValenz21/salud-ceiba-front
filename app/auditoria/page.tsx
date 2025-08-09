"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layout } from "@/components/layout"
import { Search, History, User, Calendar, Activity, Filter, Eye, Download } from "lucide-react"

const auditoriaDatos = [
  {
    id: 1,
    fecha: "2025-05-15 14:32:15",
    usuario: "Dr. María González",
    accion: "CREAR",
    modulo: "Vacunación",
    entidad: "Evento Clínico",
    descripcion: "Registro de vacuna COVID-19 para María Elena Morales",
    ip: "192.168.1.45",
    detalles: "DPI: 2547 89632 0101, Vacuna: COVID-19 Pfizer, Lote: PF2025-456",
  },
  {
    id: 2,
    fecha: "2025-05-15 11:28:42",
    usuario: "Enf. Ana López",
    accion: "ACTUALIZAR",
    modulo: "Personas",
    entidad: "Persona",
    descripcion: "Actualización de teléfono de contacto",
    ip: "192.168.1.23",
    detalles: "DPI: 2547 89632 0101, Campo: teléfono, Valor anterior: 5512-3455, Nuevo: 5512-3456",
  },
  {
    id: 3,
    fecha: "2025-05-15 09:15:33",
    usuario: "Aux. Carlos Méndez",
    accion: "CREAR",
    modulo: "Inventario",
    entidad: "Movimiento",
    descripcion: "Entrada de insumos médicos",
    ip: "192.168.1.67",
    detalles: "Paracetamol 500mg, Cantidad: 500 tabletas, Lote: PAR2025-123",
  },
  {
    id: 4,
    fecha: "2025-05-14 16:45:21",
    usuario: "Enf. María García",
    accion: "ELIMINAR",
    modulo: "Viviendas",
    entidad: "Vivienda",
    descripcion: "Eliminación de vivienda duplicada",
    ip: "192.168.1.89",
    detalles: "Código: VIV-999-2025, Motivo: Registro duplicado, Autorizado por: Supervisor",
  },
  {
    id: 5,
    fecha: "2025-05-14 13:22:18",
    usuario: "Enf. Sofía Hernández",
    accion: "ACTUALIZAR",
    modulo: "Familias",
    entidad: "Familia",
    descripcion: "Cambio de sector de familia",
    ip: "192.168.1.34",
    detalles: "Código: FAM-005-2025, Sector anterior: 2A, Nuevo sector: 2B",
  },
  {
    id: 6,
    fecha: "2025-05-14 10:18:55",
    usuario: "Aux. Pedro Morales",
    accion: "CREAR",
    modulo: "Nutrición",
    entidad: "Evento Clínico",
    descripcion: "Registro de evaluación nutricional",
    ip: "192.168.1.56",
    detalles: "Paciente: José Miguel Castillo, Peso: 68kg, Talla: 165cm, IMC: 25.0",
  },
]

export default function AuditoriaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [usuarioFilter, setUsuarioFilter] = useState("todos")
  const [accionFilter, setAccionFilter] = useState("todas")
  const [moduloFilter, setModuloFilter] = useState("todos")

  const filteredAuditoria = auditoriaDatos.filter((log) => {
    const matchesSearch =
      log.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entidad.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesUsuario = usuarioFilter === "todos" || log.usuario === usuarioFilter
    const matchesAccion = accionFilter === "todas" || log.accion === accionFilter
    const matchesModulo = moduloFilter === "todos" || log.modulo === moduloFilter

    return matchesSearch && matchesUsuario && matchesAccion && matchesModulo
  })

  const getAccionBadge = (accion: string) => {
    switch (accion) {
      case "CREAR":
        return <Badge className="bg-green-100 text-green-800">CREAR</Badge>
      case "ACTUALIZAR":
        return <Badge className="bg-blue-100 text-blue-800">ACTUALIZAR</Badge>
      case "ELIMINAR":
        return <Badge className="bg-red-100 text-red-800">ELIMINAR</Badge>
      default:
        return <Badge variant="secondary">{accion}</Badge>
    }
  }

  const getModuloBadge = (modulo: string) => {
    const colors: { [key: string]: string } = {
      Vacunación: "bg-purple-100 text-purple-800",
      Nutrición: "bg-orange-100 text-orange-800",
      Personas: "bg-blue-100 text-blue-800",
      Familias: "bg-cyan-100 text-cyan-800",
      Viviendas: "bg-teal-100 text-teal-800",
      Inventario: "bg-yellow-100 text-yellow-800",
    }

    return <Badge className={colors[modulo] || "bg-gray-100 text-gray-800"}>{modulo}</Badge>
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <History className="w-8 h-8 mr-3 text-blue-600" />
              Auditoría del Sistema
            </h1>
            <p className="text-blue-600">Registro de actividades y trazabilidad de cambios</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exportar Logs
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Activity className="w-4 h-4 mr-2" />
              Configurar Auditoría
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Eventos Hoy</p>
                  <p className="text-2xl font-bold text-blue-900">47</p>
                  <p className="text-xs text-blue-600">Acciones registradas</p>
                </div>
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Usuarios Activos</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                  <p className="text-xs text-green-600">En las últimas 24h</p>
                </div>
                <User className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Módulo Más Usado</p>
                  <p className="text-2xl font-bold text-purple-600">Vacunación</p>
                  <p className="text-xs text-purple-600">34% de actividad</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Top</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Retención Logs</p>
                  <p className="text-2xl font-bold text-blue-600">90 días</p>
                  <p className="text-xs text-blue-600">Política actual</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y Búsqueda */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtros de Auditoría
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="Buscar por descripción o usuario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 border-blue-200 focus:border-blue-500"
                />
              </div>
              <Select value={usuarioFilter} onValueChange={setUsuarioFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Dr. María González">Dr. María González</SelectItem>
                  <SelectItem value="Enf. Ana López">Enf. Ana López</SelectItem>
                  <SelectItem value="Aux. Carlos Méndez">Aux. Carlos Méndez</SelectItem>
                  <SelectItem value="Enf. María García">Enf. María García</SelectItem>
                  <SelectItem value="Enf. Sofía Hernández">Enf. Sofía Hernández</SelectItem>
                </SelectContent>
              </Select>
              <Select value={accionFilter} onValueChange={setAccionFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Acción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="CREAR">CREAR</SelectItem>
                  <SelectItem value="ACTUALIZAR">ACTUALIZAR</SelectItem>
                  <SelectItem value="ELIMINAR">ELIMINAR</SelectItem>
                </SelectContent>
              </Select>
              <Select value={moduloFilter} onValueChange={setModuloFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Módulo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Vacunación">Vacunación</SelectItem>
                  <SelectItem value="Nutrición">Nutrición</SelectItem>
                  <SelectItem value="Personas">Personas</SelectItem>
                  <SelectItem value="Familias">Familias</SelectItem>
                  <SelectItem value="Viviendas">Viviendas</SelectItem>
                  <SelectItem value="Inventario">Inventario</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
                Limpiar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Auditoría */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-900">Registro de Auditoría</CardTitle>
                <CardDescription>
                  Mostrando {filteredAuditoria.length} de {auditoriaDatos.length} eventos
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                  Exportar
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
                    <TableHead className="text-blue-900 font-semibold">Fecha/Hora</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Usuario</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Acción</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Módulo</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Entidad</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Descripción</TableHead>
                    <TableHead className="text-blue-900 font-semibold">IP</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAuditoria.map((log) => (
                    <TableRow key={log.id} className="hover:bg-blue-50/50">
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-600" />
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{log.fecha.split(" ")[0]}</div>
                            <div className="text-xs text-gray-600">{log.fecha.split(" ")[1]}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-blue-600" />
                          <span className="text-sm">{log.usuario}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getAccionBadge(log.accion)}</TableCell>
                      <TableCell>{getModuloBadge(log.modulo)}</TableCell>
                      <TableCell className="font-medium text-sm">{log.entidad}</TableCell>
                      <TableCell className="max-w-64">
                        <div className="truncate" title={log.descripcion}>
                          {log.descripcion}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-gray-600">{log.ip}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-blue-600">Mostrando 1-6 de {filteredAuditoria.length} resultados</div>
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
  )
}
